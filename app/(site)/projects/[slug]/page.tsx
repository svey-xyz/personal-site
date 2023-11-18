import { fetchReadme, fetchUserData, fetchUserRepos, singleRepoData } from "@lib/fetch.data";
import React from "react";

import { Base64 } from 'js-base64';
import { MarkdownRenderer } from "@/lib/Markdown";

export default async function ProjectsPage({ params }: { params: { slug: string } }) {
	const repoList = await fetchUserRepos({ username: 'svey-xyz', type: 'owner', sort: 'created' });
	const slugs = repoList.data.map((repo) => {
		return repo.name
	})

	if (slugs.indexOf(params.slug) == -1) return;
	const repo = repoList.data[slugs.indexOf(params.slug)]
	const readme = await fetchReadme({owner: repo.owner.login, repo: repo.name})
	// atob doesn't decode emojis properly
	const markdown: string = Base64.decode(readme ? readme.data.content : ``)
	
	return (
		<div className="main-padding flex flex-col">
			{/* PROJECT TITLE */}
			<a href='/' aria-label='Return to homepage.' className="relative block w-full h-full py-4">
				{`<- ${ repo.name }`}
			</a>
			<MarkdownRenderer>{markdown}</MarkdownRenderer>
		</div>
	)
}