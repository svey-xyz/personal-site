'use client';

import { project, taxonomy } from "@lib/types/data.types";
import FeaturedProjectCard from "@components/FeaturedProjectCard";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ProjectCard from "@components/ProjectCard";
import { taxonomiesFromProjects } from "@/lib/taxonomiesFromProjects";

export enum cardType {
	standard,
	featured,
}

const sortingProperties = {
	created: 'created',
	updated: 'updated',
};

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

	const allTag: taxonomy = {
		title: 'all'
	}

	const taxonomies = taxonomiesFromProjects(projects, allTag.title)
	taxonomies.unshift(allTag)

	const [filteredTaxonomyTitle, setFilteredTaxonomyTitle] = useState<string>(allTag.title)
	const allTagRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (!mounted) setMounted(true)
		const sortArray = (property: string) => {
			const sortProperty = sortingProperties[property];

			const sorted = [...projects].sort((a, b) => Date.parse(b[sortProperty]) - Date.parse(a[sortProperty]));
			setRepoData(sorted);
		};

		sortArray(currentSortingProperty);
		allTagRef.current ? allTagRef.current.checked = true : null

		/** Insert all tag into all projects for filtering */
		projects.forEach((project: project) => {
			if (!project.taxonomies) project.taxonomies = []
			project.taxonomies?.unshift(allTag)
		});

	}, [currentSortingProperty]);

	const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFilteredTaxonomyTitle(event.target?.value);
	}

	return (
		<section className={`${className} max-w-prose-full`}>
			<div className="flex flex-row justify-between mb-4 items-end">
				<span className="font-bold text-lg leading-none">{title}</span>
				{ sort &&
					<select className='p-2 cursor-pointer border border-accent-secondary/40 rounded bg-accent-secondary/20'
						onChange={(e) => { if (mounted) setCurrentSortingProperty(e.target.value) }}>
							{ Object.values(sortingProperties).map((property) => {
								return <option key={property} value={property}>{property}</option>
							}) }
					</select>
				}
			</div>
			{ filter &&
				<fieldset className="flex flex-row flex-wrap gap-x-4 gap-y-2 mb-4">
					{(taxonomies &&
						taxonomies.map((taxonomy: taxonomy) => {
							return (
								<div key={taxonomy.title} className="group relative flex cursor-pointer w-auto h-full flex-col items-center justify-center">
									<input type="radio" name="taxonomies" value={taxonomy.title} aria-label='Set the archive filter.'
										className="absolute left-1/2 -translate-x-1/2 h-full w-full appearance-none cursor-pointer"
										checked={filteredTaxonomyTitle == taxonomy.title} onChange={handleFilterChange} ref={(() => { if (filteredTaxonomyTitle == taxonomy.title) return allTagRef })()} />
									<label className="leading-none text-sm">{taxonomy.title}</label>
								</div>
							)
						})
					)}
				</fieldset>
			}

			<div className="flex flex-col gap-1">
				{ (() => {
					const projectsList = mounted ? repoData : projects
					return projectsList.map((project) => {
						let tagInFilter: boolean = false;
						project.taxonomies?.forEach((taxonomy: taxonomy) => {
							if (taxonomy.title == filteredTaxonomyTitle) tagInFilter = true;
						});
						const card: JSX.Element = cardSelection == cardType.featured ?
							<FeaturedProjectCard key={`${project.title}-${cardSelection}`} project={project} filtered={tagInFilter} allTagTitle={allTag.title} /> :
							<ProjectCard key={`${project.title}-${cardSelection}`} project={project} filtered={tagInFilter} allTagTitle={allTag.title} />
						return card
					})
				})() }
			</div>
		</section>
	)
}

export default ProjectsList;