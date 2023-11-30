import React from "react";
import { ProjectData } from "@lib/data";

import { MarkdownRenderer } from "@/lib/MarkdownRenderer";

export default async function ProjectsPage({ params }: { params: { slug: string } }) {
	const slugs = ProjectData.map((project) => {
		return project.title.toLowerCase()
	})

	console.log(slugs)

	if (slugs.indexOf(params.slug) == -1) return;
	const project = ProjectData[slugs.indexOf(params.slug)]
	
	return (
		<div className="relative main-padding flex flex-col">
			<div className="max-w-prose">
				{/* PROJECT TITLE */}
				<a href='/' aria-label='Return to homepage.' className="relative block w-full h-full py-4">
					{`<- ${project.title }`}
				</a>

				{( project.about && 
					<MarkdownRenderer>{project.about}</MarkdownRenderer>
				)}
			</div>


		</div>
	)
}