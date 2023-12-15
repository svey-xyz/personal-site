import React from "react";
import ProjectsList from "@components/ProjectsList"
import { ProjectData } from "@lib/data"

export default async function ProjectsPage() {
	return (
		<div className="relative main-padding flex flex-col">
			<section id="projectsArchive" className="">
				<ProjectsList projects={ProjectData.projects} title={'projects'} sort={true} filter={true} className="mt-8" />
			</section>
		</div>
	)
}