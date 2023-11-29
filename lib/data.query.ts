import fragments from '@lib/graphql/fragments.gql'

export interface taxonomy {
	title: string,
}

export interface project {
	title: string,
	description: string,
	created: string,
	updated: string,
	website: string,
	taxonomies: Array<taxonomy>,
	gitHubURL: string
}

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
		body: JSON.stringify({ query: `${fragments} ${query}`, variables: { ...variables } })
	})
	const data = await response.json()
	console.log(data.data.viewer.repositories)
	return data
}
