import { user, project, taxonomy } from '@lib/types/data.types'
import { DefaultBranchQuery, RepoContentQuery, RepoFragment, User, UserQuery } from '@lib/types/generated/graphql'
import queryUser from '@lib/graphql/user.gql'
import queryDefaultBranch from '@lib/graphql/defaultBranch.gql'
import queryRepoContent from '@lib/graphql/repoContent.gql'
import fragmentRepo from '@lib/graphql/repoFragment.gql'
import { env } from 'process'

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

export async function getRepoContentData(repo: string, path: string): Promise<string> {
	const defaultBranch = (await query({
		query:queryDefaultBranch,
		queryVars:{ 'repoName':repo }
	})) as DefaultBranchQuery
	const repoPath = `${(defaultBranch.viewer.repository.defaultBranchRef.name)}:${path}`

	const repoContent = (await query({
			query:queryRepoContent,
			queryVars:{'repoName':repo, 'path':repoPath}
	})) as RepoContentQuery

	return repoContent.viewer.repository.object[`text`]
}

export async function getUserData(aboutPath?:string): Promise<user> {
	const about = await getRepoContentData(`svey-xyz`, aboutPath)
	const data = await query({ query: queryUser, fragment: fragmentRepo }) as UserQuery
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
		featured: data.viewer.pinnedItems.nodes.map((repo) => {
				return repoToProject(repo as RepoFragment)
			})
	}

	return userData
}

function repoToProject(repo: RepoFragment): project {
	const taxonomies = repo.repositoryTopics.nodes.map((repoTopic) => {
		return { title: repoTopic.topic.name }
	})
	const proj = {
		title: repo.name,
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
