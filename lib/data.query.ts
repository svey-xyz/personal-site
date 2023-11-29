import { user } from '@lib/types/data.types'
import fragments from '@lib/graphql/fragments.gql'
import { User, UserQuery } from '@lib/types/generated/graphql'
import { features } from 'process'

import userQuery from '@lib/graphql/user.gql'


export async function query(query: string, queryVars?: Array<{var:string,val:string}>) {
	const variables = queryVars?.map((obj) => {
		return `${obj.var} : ${obj.val}`
	})
	const response = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.GITHUB_API_KEY}`,
		},
		body: JSON.stringify({ query: query, variables: { ...variables } })
	})
	const data = (await response.json()).data
	return data 
}

export async function getUserData(): Promise<user> {
	return mutateUserData(await query(userQuery))
}

function mutateUserData(data:UserQuery): user {
	console.log(data)
	return {
		name: data.viewer.name,
		bio: data.viewer.bio,
		about: '',
		// socials: [
		// 	...data.socialAccounts?.nodes.map((social) => {
		// 		return { provider: social.provider, url: social.url }
		// 	})
		// ],
		// email: data.viewer.email,
		// featured: [
		// 	...data.pinnedItems.nodes.map((feature)) => {
		// 		return {
		// 			title: ``
		// 		}
		// 	}
		// ]

	}
}