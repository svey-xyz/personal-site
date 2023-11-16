import { fetchRepoContent as fetchRepoReadme, singleRepoData } from "@/lib/fetch.data";

export async function ProjectCard({
	repo
}: {
	repo: singleRepoData
}) {
	const README = await fetchRepoReadme({owner: 'svey-xyz', repo: repo.name })
	repo.topics ?
	repo.topics.splice(
		repo.topics.indexOf(process.env.PUBLISH_REPO_KEY!), 1
	) :
	undefined

	return (
		<a href={`/projects/${repo.name}`}>
			<div className="my-4 pt-2 flex flex-col md:flex-row justify-between max-w-prose border-t border-primary-text">
				<div>{repo.name}</div>
				{( repo.topics && 
					<div className="relative flex text-right">
						{ repo.topics.map((topic, i, arr) => {
							return <div key={`${repo.id}-${topic}`}>
								{ topic }{ i < arr.length - 1 ? ', ' : '' }
							</div>
						}) }
					</div>
					)}
				{/* <div>{repo.description}</div> */}
				{/* <div>{( README &&
					atob(README.data.content)
				)}</div> */}
			</div>
		</a>
	)
}

export default ProjectCard;