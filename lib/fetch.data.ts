import { Octokit } from '@octokit/core'
import { Endpoints } from "@octokit/types";

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

export type singleRepoData =
	Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]

export async function fetchUserRepos(params: listUserReposParameters): Promise<listUserReposResponse> {
	const response = await octokit.request("GET /user/repos", {
		headers: {
			authorization: `token ${process.env.GITHUB_API_KEY}`,
		},
		...params
	});
	return response
}

export async function fetchUserData(params: userDataParameters): Promise<userDataResponse> {
	const response = await octokit.request("GET /user", {
		headers: {
			authorization: `token ${process.env.GITHUB_API_KEY}`,
		},
		...params
	});
	return response
}

export async function fetchReadme(params: readmeParameters): Promise<readmeResponse | undefined> {
	let response

	try {
		response = await octokit.request("GET /repos/{owner}/{repo}/readme", {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
			...params
		});
	} catch(e) { }

	return response 
}

export async function fetchUserSocials(params: userSocialParameters): Promise<userSocialResponse> {
	const response = await octokit.request("GET /user/social_accounts", {
		headers: {
			authorization: `token ${process.env.GITHUB_API_KEY}`,
		},
		...params
	});
	return response
}
