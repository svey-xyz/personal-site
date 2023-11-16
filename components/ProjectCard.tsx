import { fetchRepoContent as fetchRepoReadme, singleRepoData } from "@/lib/fetch.data";

export async function ProjectCard({
	repo
}: {
	repo: singleRepoData
}) {
	const README = await fetchRepoReadme({owner: 'svey-xyz', repo: repo.name })

	return (
		<div className="mt-12 flex flex-col max-w-prose">
			<div>{repo.name}</div>
			{/* <div>{repo.description}</div> */}
			{/* <div>{( README &&
				atob(README.data.content)
			)}</div> */}
		</div>
	)
}

export default ProjectCard;