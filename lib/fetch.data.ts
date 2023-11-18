import { Octokit } from '@octokit/core'
import { Endpoints } from "@octokit/types";

const octokit = new Octokit({
	auth: process.env.GITHUB_API_KEY
});

export type listUserReposParameters =
	Endpoints["GET /users/{username}/repos"]["parameters"];
export type listUserReposResponse =
	Endpoints["GET /users/{username}/repos"]["response"];
export type userDataParameters = 
	Endpoints["GET /users/{username}"]["parameters"];
export type userDataResponse = 
	Endpoints["GET /users/{username}"]["response"];
export type readmeParameters =
	Endpoints["GET /repos/{owner}/{repo}/readme"]["parameters"];
export type readmeResponse =
	Endpoints["GET /repos/{owner}/{repo}/readme"]["response"];

export type singleRepoData =
	Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]

export async function fetchUserRepos(params: listUserReposParameters): Promise<listUserReposResponse> {
	const response = await octokit.request("GET /users/{username}/repos", {
		headers: {
			authorization: `token ${process.env.GITHUB_API_KEY}`,
		},
		...params
	});
	return response
}

export async function fetchUserData(params: userDataParameters): Promise<userDataResponse> {
	const response = await octokit.request("GET /users/{username}", {
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