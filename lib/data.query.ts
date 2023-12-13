import { user, project, taxonomy, website } from '@lib/types/data.types'
import { DefaultBranchQuery, GistQuery, RepoContentQuery, RepoFragment, ReposQuery, User, UserQuery } from '@lib/types/generated/graphql'
import queryUser from '@lib/graphql/user.gql'
import queryGist from '@lib/graphql/gist.gql'
import queryDefaultBranch from '@lib/graphql/defaultBranch.gql'
import queryRepoContent from '@lib/graphql/repoContent.gql'
import fragmentRepo from '@lib/graphql/repoFragment.gql'
import queryRepos from '@lib/graphql/repos.gql'

export async function query({query, queryVars, fragment}:{query:string, queryVars?:{}, fragment?:string}) {
	const combinedQuery = fragment ? 
		`${query} ${fragment}` :
		query

	const response = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.GITHUB_API_KEY}`,
		},
		body: JSON.stringify({ query: combinedQuery, variables: queryVars })
	})

	const { data, errors } = await response.json()
	if (response.ok) return data
	else return Promise.reject(new Error(errors?.map(e => e.message).join('\n') ?? 'unknown'))
}

export async function getProjectData() {

	/** Fetch data & validate fetch */

	const DATA = await query({ query: queryRepos, fragment: fragmentRepo })
	const REPOS: ReposQuery = validateFetchWithViewer(DATA)

	const FRAGMENTS = REPOS.viewer.repositories.nodes.map((obj) => {
		if (obj.__typename == "Repository") return obj as RepoFragment
	}).filter((repo) => repo !== undefined)

	/** Cast fetched data to internal type */

	const projectData: Array<project> = await reposToProjects(FRAGMENTS)

	return projectData
}

export async function getWebsiteData(aboutPath: string, gistID: string): Promise<website> {

	/** Fetch data & validate fetch */

	const ABOUT = await getRepoContentData(`svey-xyz`, aboutPath)
	const DATA = await query({ query: queryGist, queryVars: { 'gistName': gistID } })
	const SCORES: GistQuery = validateFetchWithViewer(DATA)

	let info: { scores?: string, aboutMe?: string, aboutSite?: string, aboutScores?: string} = {}

	SCORES.viewer.gist.files.forEach(file => {
		switch(file.name){
			case ('about.me.md'):
				info.aboutMe = file.text
				break;
			case ('about.site.md'):
				info.aboutSite = file.text
				break;
			case ('scores.notes.md'):
				info.scores = file.text
				break;
			case ('scores.final.json'):
				info.aboutScores = file.text
				break;
			default:
				console.log('Unused file: ', file.name)
				break;
		}
	});

	/** Cast fetched data to internal type */

	const WEBSITE_DATA: website = {
		about: ABOUT,
		// scores: JSON.parse(info.scores)
		aboutScores: info.aboutScores
	}
	console.log(WEBSITE_DATA.aboutScores)

	return WEBSITE_DATA
}

export async function getUserData(aboutPath?:string): Promise<user> {

	/** Fetch data & validate fetch */

	const ABOUT = await getRepoContentData(`svey-xyz`, aboutPath)
	const DATA = await query({ query: queryUser, fragment: fragmentRepo })
	const USER: UserQuery = validateFetchWithViewer(DATA)

	/** Cast fetched data to internal type */

	const FRAGMENTS = USER.viewer.pinnedItems.nodes.map((obj) => {
		if (obj.__typename == "Repository") return obj as RepoFragment
	}).filter((repo) => repo !== undefined)

	const FEATURED = await reposToProjects(FRAGMENTS)

	const USER_DATA: user = {
		login: USER.viewer.login,
		name: USER.viewer.name,
		bio: USER.viewer.bio,
		about: ABOUT,
		socials: [
			{ provider: 'github', url: USER.viewer.url },
			...USER.viewer.socialAccounts?.nodes.map((social) => {
				return { provider: social.provider.toLowerCase(), url: social.url }
			})
		],
		email: USER.viewer.email,
		featured: FEATURED
	}

	return USER_DATA
}

async function getRepoContentData(repo: string, path: string): Promise<string | undefined> {

	/** Fetch data & validate fetch */

	const BRANCH_DATA = (await query({
		query: queryDefaultBranch,
		queryVars: { 'repoName': repo }
	}))
	const DEFAULT_BRANCH: DefaultBranchQuery = validateFetchWithViewer(BRANCH_DATA)
	if (!DEFAULT_BRANCH.viewer.repository) return

	const repoPath = `${(DEFAULT_BRANCH.viewer.repository.defaultBranchRef.name)}:${path}`

	const REPO_DATA = (await query({
		query: queryRepoContent,
		queryVars: { 'repoName': repo, 'path': repoPath }
	}))
	const REPO_CONTENT: RepoContentQuery = validateFetchWithViewer(REPO_DATA)

	const CONTEXT_TEXT = REPO_CONTENT.viewer.repository.object?.__typename == "Blob" ?
		REPO_CONTENT.viewer.repository.object.text :
		undefined

	return CONTEXT_TEXT
}

function validateFetchWithViewer(data: any) {
	const VIEWER = data?.viewer
	if (!VIEWER) return Promise.reject(new Error(`Failed type casting`))
	else return data
}

async function reposToProjects(repos: Array<RepoFragment>): Promise<Array<project>> {

	const projects = await Promise.all(repos.map(async (repo)=>{
		const taxonomies = repo.repositoryTopics.nodes.map((repoTopic) => {
			return { title: repoTopic.topic.name }
		})
		const slugs = taxonomies.map((tax) => {
			return tax.title
		})
		if (slugs.indexOf(process.env.PUBLISH_REPO_KEY) == -1) return

		const about = await getRepoContentData(repo.name, 'README.md')

		const trimmedTaxonomies = taxonomies.filter((value: taxonomy, index: number, array: taxonomy[]) =>
			value.title !== process.env.PUBLISH_REPO_KEY)

		const proj = {
			title: repo.name,
			about: about,
			created: repo.createdAt,
			updated: repo.pushedAt,
			description: repo.description,
			githubURL: repo.url,
			taxonomies: trimmedTaxonomies
		}

		return proj
	}))

	const trimmedProjects = projects.filter((project:project)=> project !== undefined)
	return trimmedProjects
}
