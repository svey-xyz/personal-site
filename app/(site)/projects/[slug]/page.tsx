import React, { ReactElement } from "react";
import { ProjectData, UserData } from "@lib/data";
import { IoGitMerge } from "react-icons/io5";

import { MarkdownRenderer } from "@components/MarkdownRenderer";
import NoteCard from "@components/NoteCard";
import dateConverter from "@lib/dateConverter";
import { FaLink, FaGithub } from "react-icons/fa6";
import { project, taxonomy } from "@/lib/types/data.types";

export default function ProjectPage({ params }: { params: { slug: string } }) {
	const slugs = ProjectData.projects.map((project) => {
		return project.slug
	})

	if (slugs.indexOf(params.slug) == -1) return;
	const project = ProjectData.projects[slugs.indexOf(params.slug)]
	
	return (
		<div className="after:inset-0 after:absolute after:-z-1 after:backdrop-blur-2xl after:bg-gradient-to-b
			after:from-bg/50 after:to-bg after:to-75% dark:after:from-bg/70 dark:after:to-bg">		
			<div className="relative main-padding flex flex-col">
				{/* PROJECT TITLE */}
				<a href='/projects' aria-label='Return to projects archive.' className="relative block w-full h-full py-4">
					{`<- ${project.title }`}
				</a>

				<div className="flex flex-col md:flex-row-reverse">
					<div className="flex flex-col w-full md:w-1/3 md:ml-4">
						<ProjectInfoSection title='created'>
							{dateConverter(new Date(Date.parse(project.created)))}
						</ProjectInfoSection>

						<ProjectInfoSection title='updated'>
							{dateConverter(new Date(Date.parse(project.updated)))}
						</ProjectInfoSection>

						{(project.taxonomies?.length > 0) &&
							<ProjectInfoSection title='taxonomies'>
								<div className="flex flex-row flex-wrap gap-x-2">
									{project.taxonomies.map((taxonomy: taxonomy) => {
										return (
											<span key={taxonomy.title} className="">
												{taxonomy.title}
											</span>
										)
									})}
								</div>
							</ProjectInfoSection>
						}

						{project.githubURL &&
							<ProjectInfoSection title='repo'>
								<div className="flex flex-row gap-x-2 items-center">
									<IoGitMerge className="h-4 w-4 min-w-[1rem] min-h-[1rem]" />
									<a href={project.githubURL} target="_blank" aria-label="Link to project repo.">
										{project.githubURL.split('https://')[1]}
									</a>
								</div>
							</ProjectInfoSection>
						}
						
						{project.website &&
							<ProjectInfoSection title='site'>
								<div className="flex flex-row gap-x-2 items-center">
									<FaLink className="h-4 w-4 min-w-[1rem] min-h-[1rem]" />
									<a href={project.website} target="_blank" aria-label="Link to project website.">
										{project.website}
									</a>
								</div>
							</ProjectInfoSection>
						}

						<ProjectInfoSection title='built by'>
							<div className="flex flex-row gap-x-2 items-center">
								<FaGithub className="h-4 w-4 min-w-[1rem] min-h-[1rem]" />
								<a href={UserData.socials[0]?.url} className="">
									{UserData.name}
								</a>
							</div>
						</ProjectInfoSection>
					</div>

					<div className="flex flex-col md:w-2/3 md:mr-4">
						{(project.about &&
							<MarkdownRenderer>{project.about}</MarkdownRenderer>
						)}
						{(!project.about &&
							<NoteCard markdown={`Uh Oh! This project doesn't have any documentation yet. Don't worry, I'm working on it. Take a look around the rest of the site in the meantime, or reach out to inquire more about this project.`} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

function ProjectInfoSection({title,children,className}:{title: string, children?: React.JSX.Element | string, className?: string}) {
	if (!children) return
	return (
		<div className={`${className} flex flex-col border-b border-accent-secondary/40 mb-6 w-full`}>
			<span className="text-fg/80">{title}</span>
			<div className="py-2">
				{children}
			</div>
		</div>
	)
}

export async function generateStaticParams() {
	return ProjectData.projects.map((project: project)=>({
		slug:project.slug
	}))
}