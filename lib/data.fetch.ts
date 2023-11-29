import { getUserData, query } from '@/lib/data.query';
import { Octokit } from '@octokit/core'
import { Endpoints, GetResponseTypeFromEndpointMethod } from "@octokit/types";

export const UserData = await (async () => { return await getUserData() })()

const octokit = new Octokit({
	auth: process.env.GITHUB_API_KEY,
	userAgent: 'personal-blog/v0.0.1'
});

export type listUserReposParameters =
	Endpoints["GET /user/repos"]["parameters"];
export type listUserReposResponse =
	Endpoints["GET /user/repos"]["response"];
export type userDataParameters = 
	Endpoints["GET /user"]["parameters"];
export type userDataResponse = 
	Endpoints["GET /user"]["response"];
export type userSocialParameters =
	Endpoints["GET /user/social_accounts"]["parameters"];
export type userSocialResponse =
	Endpoints["GET /user/social_accounts"]["response"];
export type readmeParameters =
	Endpoints["GET /repos/{owner}/{repo}/readme"]["parameters"];
export type readmeResponse =
	Endpoints["GET /repos/{owner}/{repo}/readme"]["response"];
export type contentPathParameters =
	Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["parameters"];
export type contentPathResponse =
	Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"];

export type singleRepoData =
	Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]

export const OCTO_USER = await (async () => { 
	return await octokit.request("GET /user", {
		headers: { authorization: `token ${process.env.GITHUB_API_KEY}` }
	});
})()

export const OCTO_USER_SOCIALS = await (async () => { 
	return await octokit.request("GET /user/social_accounts", {
		headers: { authorization: `token ${process.env.GITHUB_API_KEY}` }
	});
})()

console.log(await (async () => { return await getUserData() })())


export async function fetchUserRepos(params: listUserReposParameters): Promise<Array<singleRepoData>> {
	const response = await octokit.request("GET /user/repos", {
		headers: {
			authorization: `token ${process.env.GITHUB_API_KEY}`,
		},
		...params
	});
	const repos = response.data.filter((repo)=>
		(repo.topics?.indexOf(process.env.PUBLISH_REPO_KEY!) !== -1)
	).map((repo) => {
		if (repo.topics) repo.topics.splice(
			repo.topics.indexOf(process.env.PUBLISH_REPO_KEY!), 1
		)
		return repo as singleRepoData
	})

	return repos 
}

export async function fetchReadme(params: readmeParameters): Promise<readmeResponse | undefined> {
	let response: readmeResponse | undefined
	try {
		response = await octokit.request("GET /repos/{owner}/{repo}/readme", {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
			...params
		});
	} catch(e) {
		if (process.env.VERBOSE) console.log(e)
		console.log(`README.md not found on repo: ${params.repo} with owner: ${params.owner}`)
	}
	return response 
}

export async function fetchPathContent(params: contentPathParameters): Promise<contentPathResponse | undefined> {
	let response: contentPathResponse | undefined
	try {
		response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
			...params
		});
	} catch(e) {
		if (process.env.VERBOSE) console.log(e)
		console.log(`Path: ${params.path}, not found on repo: ${params.repo} with owner: ${params.owner}`)
	}

	return response
}
