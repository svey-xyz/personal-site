import { ReactElement, ReactNode } from "react";
import { fetchUserData, fetchUserRepos, singleRepoData } from "../../../../lib/fetch.data";
import React from "react";


export default async function ProjectsPage({ params }: { params: { slug: string } }) {
	const repoList = await fetchUserRepos({ username: 'svey-xyz', type: 'owner', sort: 'created' });
	const slugs = repoList.data.map((repo) => {
		return repo.name
	})

	if (slugs.indexOf(params.slug) == -1) return;
	const repo = repoList.data[slugs.indexOf(params.slug)]

	return (
		<div className="main-padding flex flex-col">
			{/* PROJECT TITLE */}
			<h2 className="relative w-full h-full py-4 text-5xl separator">
				{ repo.name }
			</h2>
		</div>
	)
}