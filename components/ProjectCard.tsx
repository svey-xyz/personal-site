import { singleRepoData } from "@/lib/fetch.data";

export async function ProjectCard({
	repo
}: {
	repo: singleRepoData
}) {
	repo.topics ?
	repo.topics.splice(
		repo.topics.indexOf(process.env.PUBLISH_REPO_KEY!), 1
	) :
	undefined

	return (
		<a href={`/projects/${repo.name}`} className="my-2 max-w-prose group">
			<div className="relative py-2 flex flex-col md:flex-row justify-between w-full border-t border-primary-text overflow-hidden
				after:absolute after:inset-0 after:-z-1">
				<div className="group-hover:text-primary-accent">{repo.name}</div>
				{( repo.topics && 
					<div className="relative flex text-right">
						{ repo.topics.map((topic, i, arr) => {
							return <span key={`${repo.id}-${topic}`}>
								{ topic }{ i < arr.length - 1 ? <span>,&nbsp;</span> : '' }
							</span>
						}) }
					</div>
					)}
			</div>
		</a>
	)
}

export default ProjectCard;