import { user, project, taxonomy } from '@lib/types/data.types'
import { DefaultBranchQuery, RepoContentQuery, RepoFragment, ReposQuery, User, UserQuery } from '@lib/types/generated/graphql'
import queryUser from '@lib/graphql/user.gql'
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

	const data = (await response.json()).data
	if (data) return data
	else throw new Error(await response.json());
}

export async function getProjectData() {
	const data = await query({ query: queryRepos, fragment: fragmentRepo }) as ReposQuery
	const repoArray = data.viewer.repositories.nodes as Array<RepoFragment>
	const projectData: Array<project> = await Promise.all(repoArray.map((repo) => {
		return repoToProject(repo)
	}))

	return projectData
}

export async function getUserData(aboutPath?:string): Promise<user> {
	const about = await getRepoContentData(`svey-xyz`, aboutPath)
	const data = await query({ query: queryUser, fragment: fragmentRepo }) as UserQuery
	const featured = await Promise.all(data.viewer.pinnedItems.nodes.map((repo) => {
		const proj = repoToProject(repo as RepoFragment)
		return proj
	}))
	const userData: user = {
		login: data.viewer.login,
		name: data.viewer.name,
		bio: data.viewer.bio,
		about: about,
		socials: [
			{ provider: 'github', url: data.viewer.url },
			...data.viewer.socialAccounts?.nodes.map((social) => {
				return { provider: social.provider.toLowerCase(), url: social.url }
			})
		],
		email: data.viewer.email,
		featured: featured
	}

	return userData
}

async function getRepoContentData(repo: string, path: string): Promise<string | undefined> {
	const defaultBranch = (await query({
		query: queryDefaultBranch,
		queryVars: { 'repoName': repo }
	})) as DefaultBranchQuery
	if (!defaultBranch.viewer.repository) return

	const repoPath = `${(defaultBranch.viewer.repository.defaultBranchRef.name)}:${path}`

	const repoContent = (await query({
		query: queryRepoContent,
		queryVars: { 'repoName': repo, 'path': repoPath }
	})) as RepoContentQuery

	return repoContent.viewer.repository.object ?
		repoContent.viewer.repository.object[`text`] :
		undefined
}


async function repoToProject(repo: RepoFragment): Promise<project> {
	const taxonomies = repo.repositoryTopics.nodes.map((repoTopic) => {
		return { title: repoTopic.topic.name }
	})
	const about = await getRepoContentData(repo.name, 'README.md')
	const proj = {
		title: repo.name,
		about: about,
		created: repo.createdAt,
		updated: repo.pushedAt,
		description: repo.description,
		githubURL: repo.url,
		taxonomies: [
			...trimTaxonomies(taxonomies)
		]
	}
	return proj
}

function trimTaxonomies(taxonomies: Array<taxonomy>) {
	return taxonomies.filter((value: taxonomy, index: number, array: taxonomy[]) => value.title !== process.env.PUBLISH_REPO_KEY)
}
