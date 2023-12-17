import { user, project, taxonomy, website } from '@lib/types/data.types'
import { DefaultBranchQuery, GistQuery, RepoContentQuery, RepoFragment, ReposQuery, User, UserQuery } from '@lib/types/generated/graphql'
import queryUser from '@lib/graphql/user.gql'
import queryGist from '@lib/graphql/gist.gql'
import queryDefaultBranch from '@lib/graphql/defaultBranch.gql'
import queryRepoContent from '@lib/graphql/repoContent.gql'
import fragmentRepo from '@lib/graphql/repoFragment.gql'
import queryRepos from '@lib/graphql/repos.gql'
import { taxonomiesFromProjects } from '@lib/taxonomiesFromProjects'
import slugify from 'slugify'

export const slugifyOptions = {
	replacement: '-',  // replace spaces with replacement character, defaults to `-`
	remove: undefined, // remove characters that match regex, defaults to `undefined`
	lower: true,      // convert to lower case, defaults to `false`
	strict: true,     // strip special characters except replacement, defaults to `false`
	locale: 'en',      // language code of the locale to use
	trim: true         // trim leading and trailing replacement chars, defaults to `true`
}

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
	else return Promise.reject(new Error(errors?.map((e: Error) => e.message).join('\n') ?? 'unknown'))
}

enum DataFileNames {
	aboutUser = 'about.me.md',
	aboutSite = 'about.site.md',
	aboutScores = 'scores.notes.md',
	scores = 'scores.final.json',
}

const GIST_DATA: GistQuery = validateFetchWithViewer(
	await (async () => {
		return await query({ query: queryGist, queryVars: { 'gistName': 'de3ae926f3912b83586843e680dc9665' } })
	})()
)
const USER_DATA: UserQuery = validateFetchWithViewer(
	await (async () => {
		return await query({ query: queryUser, fragment: fragmentRepo })
	})()
)


export async function getProjectData(): Promise<{
	projects: project[];
	taxonomies: taxonomy[];
}> {

	/** Fetch data & validate fetch */

	const DATA = await query({ query: queryRepos, fragment: fragmentRepo })
	const REPOS: ReposQuery = validateFetchWithViewer(DATA)

	const FRAGMENTS = REPOS.viewer.repositories.nodes.map((obj) => {
		if (obj.__typename == "Repository") return obj as RepoFragment
	}).filter((repo) => repo !== undefined)

	/** Cast fetched data to internal type */

	const projects: Array<project> = await reposToProjects(FRAGMENTS)



	return {
		projects: projects,
		taxonomies: taxonomiesFromProjects(projects)
	}
}

/**
 *
 * Casts fetched data to internal type
 * @export
 * @return {*}  {Promise<website>}
 */
export async function getWebsiteData(): Promise<website> {
	const WEBSITE_DATA: website = {
		about: GIST_DATA.viewer.gist.files.filter(file => file.name == DataFileNames.aboutSite)[0].text,
		scores: JSON.parse(GIST_DATA.viewer.gist.files.filter(file => file.name == DataFileNames.scores)[0].text),
		aboutScores: GIST_DATA.viewer.gist.files.filter(file => file.name == DataFileNames.aboutScores)[0].text
	}

	return WEBSITE_DATA
}

/**
 *
 * Casts fetched data to internal type
 * @export
 * @return {*}  {Promise<user>}
 */
export async function getUserData(): Promise<user> {
	const FRAGMENTS = USER_DATA.viewer.pinnedItems.nodes.map((obj) => {
		if (obj.__typename == "Repository") return obj as RepoFragment
	}).filter((repo) => repo !== undefined)

	const FEATURED = await reposToProjects(FRAGMENTS)

	const USER: user = {
		login: USER_DATA.viewer.login,
		name: USER_DATA.viewer.name,
		bio: USER_DATA.viewer.bio,
		about: GIST_DATA.viewer.gist.files.filter(file => file.name == DataFileNames.aboutUser)[0].text,
		socials: [
			{ provider: 'github', url: USER_DATA.viewer.url },
			...USER_DATA.viewer.socialAccounts?.nodes.map((social) => {
				return { provider: social.provider.toLowerCase(), url: social.url }
			})
		],
		email: USER_DATA.viewer.email,
		featured: FEATURED
	}

	return USER
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
			slug: slugify(repo.name, slugifyOptions),
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
