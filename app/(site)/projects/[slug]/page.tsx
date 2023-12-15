import React from "react";
import { ProjectData } from "@lib/data";

import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import NoteCard from "@/components/NoteCard";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
	const slugs = ProjectData.projects.map((project) => {
		return project.title.toLowerCase()
	})

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
				{( !project.about &&
					<NoteCard markdown={`Uh Oh! This project doesn't have any documentation yet. Don't worry, I'm working on it. Take a look around the rest of the site in the meantime, or reach out to inquire more about this project.`} />
				)}
			</div>


		</div>
	)
}