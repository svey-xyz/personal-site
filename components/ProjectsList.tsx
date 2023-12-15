'use client';

import { project } from "@lib/types/data.types";
import FeaturedProjectCard from "@components/FeaturedProjectCard";
import { useEffect, useState } from "react";
import ProjectCard from "@components/ProjectCard";
import { taxonomiesFromProjects } from "@/lib/taxonomiesFromProjects";

export enum cardType {
	standard,
	featured,
}

export function ProjectsList({
	projects,
	cardSelection=cardType.standard,
	sort=true,
	filter=false,
	title='projects',
	className='',
}: {
	projects: Array<project>,
	cardSelection?: cardType,
	sort?: boolean,
	filter?: boolean,
	title?:string,
	className?: string
}) {
	const [repoData, setRepoData] = useState<Array<project>>([]);
	const [currentSortingProperty, setCurrentSortingProperty] = useState('created');
	const [mounted, setMounted] = useState(false);

	const sortingProperties = {
		created: 'created',
		updated: 'updated',
	};

	useEffect(() => {
		if (!mounted) setMounted(true)
		const sortArray = (property: string) => {
			const sortProperty = sortingProperties[property];

			const sorted = [...projects].sort((a, b) => Date.parse(b[sortProperty]) - Date.parse(a[sortProperty]));
			setRepoData(sorted);
		};

		sortArray(currentSortingProperty);
	}, [currentSortingProperty]);

	return (
		<section className={`${className} max-w-prose-full`}>
			<div className="flex flex-row justify-between mb-4 items-end">
				<span className="font-bold text-lg leading-none">{title}</span>
				{ sort &&
					<select className='p-2 cursor-pointer border border-accent-secondary/40 rounded bg-accent-secondary/20'
						onChange={(e) => { if (mounted) setCurrentSortingProperty(e.target.value) }}>
							{ Object.values(sortingProperties).map((property) => {
								return <option value={property}>{property}</option>
							}) }
					</select>
				}
			</div>
			{ filter &&
				<div className="flex flex-row flex-wrap gap-x-4 mb-4">
					{ taxonomiesFromProjects(projects).map((taxonomy, i, arr) => {
						return (
							<a key={taxonomy.title} className="text-fg/60 hover:text-fg/80">
								{taxonomy.title}
							</a>
						)
					})
					}
				</div>
			}

			<div className="flex flex-col gap-1">
				{ (() => {
					const projectsList = mounted ? repoData : projects
					return projectsList.map((project) => {
						const card: JSX.Element = cardSelection == cardType.featured ?
							<FeaturedProjectCard key={`${project.title}-${cardSelection}`} project={project} /> :
							<ProjectCard key={`${project.title}-${cardSelection}`} project={project} />
						return card
					})
				})() }
			</div>
		</section>
	)
}

export default ProjectsList;