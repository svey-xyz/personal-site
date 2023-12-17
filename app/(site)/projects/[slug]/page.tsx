import React from "react";
import { ProjectData } from "@lib/data";

import { MarkdownRenderer } from "@components/MarkdownRenderer";
import NoteCard from "@components/NoteCard";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
	const slugs = ProjectData.projects.map((project) => {
		return project.slug
	})

	if (slugs.indexOf(params.slug) == -1) return;
	const project = ProjectData.projects[slugs.indexOf(params.slug)]

	console.log('hey there')
	
	return (
		<div className="after:inset-0 after:absolute after:-z-1 after:backdrop-blur-2xl after:bg-gradient-to-b
			after:from-bg/50 after:to-bg after:to-75% dark:after:from-bg/70 dark:after:to-bg">		
			<div className="relative main-padding flex flex-col">
				<div className="max-w-prose">
					{/* PROJECT TITLE */}
					<a href='/projects' aria-label='Return to projects archive.' className="relative block w-full h-full py-4">
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
		</div>
	)
}