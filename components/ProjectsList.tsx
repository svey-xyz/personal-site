'use client';

import { project } from "@/lib/types/data.types";
import ProjectCard from "@components/ProjectCard";
import { useEffect, useState } from "react";

export function ProjectsList({
	projects,
	filterable=true,
	title='projects',
	className=''
}: {
	projects: Array<project>,
	filterable?: boolean,
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
			<div className="flex flex-row justify-between mb-4">
				<span className="font-bold text-lg">{title}</span>
				{( filterable &&
					<select className='p-2 cursor-pointer border border-bg-primary/40 rounded
						backdrop-blur-xl bg-bg/70 hover:bg-bg/40 transition-colors duration-300'
						onChange={(e) => { if (mounted) setCurrentSortingProperty(e.target.value) }}>
							{ Object.values(sortingProperties).map((property) => {
								return <option value={property}>{property}</option>
							}) }
					</select>
				)}
			</div>

			<div className="flex flex-col gap-1">
				{(
					(() => {
						const repoList = mounted ? repoData : projects
						return repoList.map((project) => {
							return (
								<ProjectCard key={project.title} project={project} />
							)
						})
					})()
				)}
			</div>
		</section>
	)
}