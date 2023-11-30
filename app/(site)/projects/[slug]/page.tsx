import React from "react";

import { MarkdownRenderer } from "@/lib/MarkdownRenderer";

export default async function ProjectsPage({ params }: { params: { slug: string } }) {
	const repoList = await fetchUserRepos({ type: 'owner', sort: 'created' });
	const slugs = repoList.map((repo) => {
		return repo.name
	})

	if (slugs.indexOf(params.slug) == -1) return;
	const repo = repoList[slugs.indexOf(params.slug)]
	
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