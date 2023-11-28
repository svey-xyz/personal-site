import { fetchReadme, fetchUserRepos } from "@/lib/data.fetch";
import React from "react";

import { Base64 } from 'js-base64';
import { MarkdownRenderer } from "@/lib/MarkdownRenderer";

export default async function ProjectsPage({ params }: { params: { slug: string } }) {
	const repoList = await fetchUserRepos({ type: 'owner', sort: 'created' });
	const slugs = repoList.data.map((repo) => {
		return repo.name
	})

	if (slugs.indexOf(params.slug) == -1) return;
	const repo = repoList.data[slugs.indexOf(params.slug)]
	const readmeData = await fetchReadme({owner: repo.owner.login, repo: repo.name})
	// atob doesn't decode emojis properly
	const desc = readmeData ? Base64.decode(readmeData.data.content) : repo.description
	
	return (
		<div className="relative main-padding flex flex-col">
			<div className="max-w-prose">
				{/* PROJECT TITLE */}
				<a href='/' aria-label='Return to homepage.' className="relative block w-full h-full py-4">
					{`<- ${ repo.name }`}
				</a>

				{( desc && 
					<MarkdownRenderer>{desc}</MarkdownRenderer>
				)}
			</div>


		</div>
	)
}