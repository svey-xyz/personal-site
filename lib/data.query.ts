import { user } from '@lib/types/data.types'
import { DefaultBranchQuery, RepoContentQuery, User, UserQuery } from '@lib/types/generated/graphql'
import queryUser from '@lib/graphql/user.gql'
import queryDefaultBranch from '@lib/graphql/defaultBranch.gql'
import queryRepoContent from '@lib/graphql/repoContent.gql'

export async function query(query: string, queryVars?: {}) {
	const response = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.GITHUB_API_KEY}`,
		},
		body: JSON.stringify({ query: query, variables: queryVars })
	})

	const data = (await response.json()).data
	// console.log(data)
	return data 
}

export async function getRepoContentData(repo: string, path: string): Promise<string> {
	const defaultBranch = (await query(queryDefaultBranch, { 'repoName':repo })) as DefaultBranchQuery
	const repoPath = `${(defaultBranch.viewer.repository.defaultBranchRef.name)}:${path}`

	const repoContent = (await query(queryRepoContent, {'repoName':repo, 'path':repoPath})) as RepoContentQuery

	return repoContent.viewer.repository.object[`text`]
}

export async function getUserData(aboutPath?:string): Promise<user> {
	const about = await getRepoContentData(`svey-xyz`, aboutPath)
	const data = await query(queryUser)

	const userData: user = {
		login: data.viewer.login,
		name: data.viewer.name,
		bio: data.viewer.bio,
		about: about,
		socials: [
			...data.viewer.socialAccounts?.nodes.map((social) => {
				return { provider: social.provider.toLowerCase(), url: social.url }
			})
		],
		email: data.viewer.email,
		// featured: [
		// 	...data.pinnedItems.nodes.map((feature)) => {
		// 		return {
		// 			title: ``
		// 		}
		// 	}
		// ]

	}

	return userData
}
