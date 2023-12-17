import React from "react";
import ProjectsList from "@components/ProjectsList"
import { ProjectData } from "@lib/data"
import NoteCard from "@components/NoteCard";

export default async function ProjectsPage() {
	return (
		<div className="after:inset-0 after:absolute after:-z-1 after:backdrop-blur-2xl after:bg-gradient-to-b
			after:from-bg/50 after:to-bg after:to-75% dark:after:from-bg/70 dark:after:to-bg">
			<div className="relative main-padding flex flex-col ">
				<NoteCard markdown={`Please be aware this site is still in active development, some content may be missing.`} className="max-w-prose" />
				<section id="projectsArchive" className="">
					<ProjectsList projects={ProjectData.projects} title={'projects'} sort={true} filter={true} className="mt-2" />
				</section>
			</div>
		</div>
	)
}