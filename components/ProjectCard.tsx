import { fetchRepoContent as fetchRepoReadme, singleRepoData } from "@/lib/fetch.data";

export async function ProjectCard({
	repo
}: {
	repo: singleRepoData
}) {
	const README = await fetchRepoReadme({owner: 'svey-xyz', repo: repo.name })

	return (
		<a href={`/projects/${repo.name}`}>
			<div className="my-4 pt-2 flex flex-col max-w-prose border-t border-primary-text">
				<div>{repo.name}</div>
				{/* <div>{repo.description}</div> */}
				{/* <div>{( README &&
					atob(README.data.content)
				)}</div> */}
			</div>
		</a>
	)
}

export default ProjectCard;