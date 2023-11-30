'use client';

import { project } from "@/lib/types/data.types";
import ProjectCard from "@components/ProjectCard";
import { useEffect, useState } from "react";

export function ProjectsList({ projects, title='projects', className }: { projects: Array<project>, title?:string, className?: string }) {
	const [repoData, setRepoData] = useState<Array<project>>([]);
	const [sortType, setSortType] = useState('created');
	const [mounted, setMounted] = useState(false);

	useEffect(()=>{
		if (!mounted) setMounted(true)
	})

	useEffect(() => {
		const sortArray = (type: string) => {
			const types = {
				created: 'created',
				updated: 'updated',
			};
			const sortProperty = types[type];

			const sorted = [...projects].sort((a, b) => Date.parse(b[sortProperty]) - Date.parse(a[sortProperty]));
			setRepoData(sorted);
		};

		sortArray(sortType);
	}, [sortType]);

	return (
		<div className={`${className} max-w-prose-full`}>
			<div className="flex flex-row justify-between mb-4">
				<h2>{title}</h2>
				<select className='p-2 cursor-pointer border border-bg-primary/40 rounded
				backdrop-blur-xl bg-bg/70 hover:bg-bg/40 transition-colors duration-300' 
					onChange={(e) => { if (mounted) setSortType(e.target.value)}}>
					<option value="created">Created</option>
					<option value="updated">Pushed</option>
				</select>
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
		</div>
	)
}