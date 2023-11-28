'use client';

import ProjectCard from "@components/ProjectCard";
import { singleRepoData } from "@lib/data.fetch";
import { useEffect, useState } from "react";

export function RepoList({ repos }: { repos: Array<singleRepoData> }) {
	if (!repos) return;

	const [repoData, setRepoData] = useState([]);
	const [sortType, setSortType] = useState('created_at');
	const [mounted, setMounted] = useState(false);

	useEffect(()=>{
		if (!mounted) setMounted(true)
	})

	useEffect(() => {
		const sortArray = (type: string) => {
			const types = {
				created_at: 'created_at',
				pushed_at: 'pushed_at',
			};
			const sortProperty = types[type];
			const sorted = [...repos].sort((a, b) => Date.parse(b[sortProperty]) - Date.parse(a[sortProperty]));
			setRepoData(sorted);
		};

		sortArray(sortType);
	}, [sortType]);

	return (
		<div className="max-w-prose">
			<div className="flex flex-row justify-between mb-4">
				<h2>projects</h2>
				<select className='p-2 cursor-pointer border border-bg-primary/40 rounded
				backdrop-blur-xl bg-bg/70 hover:bg-bg/40 transition-colors duration-300' 
					onChange={(e) => { if (mounted) setSortType(e.target.value)}}>
					<option value="created_at">Created</option>
					<option value="pushed_at">Pushed</option>
				</select>
			</div>

			<div className="flex flex-col gap-1">
				{(
					(() => {
						const repoList = mounted ? repoData : repos
						return repoList.map((repo) => {
							return (
								<ProjectCard key={repo.id} repo={(repo as singleRepoData)} />
							)
						})
					})()
				)}
			</div>
		</div>
	)
}