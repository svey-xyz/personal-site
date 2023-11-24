import { singleRepoData } from "@/lib/data.fetch";
import { Utils } from '@lib/utils'
export function ProjectCard({
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
			<div className="relative py-4 px-2 flex flex-col md:flex-row justify-between w-full border border-bg-primary/40 rounded
				after:absolute after:inset-0 after:-z-1 after:backdrop-blur-3xl after:bg-bg/5 group-hover:after:bg-bg/30
				after:duration-[1500ms] after:transition-colors group-hover:after:duration-100">
				<div className="text-fg-primary opacity-80 group-hover:opacity-100
					duration-[1500ms] transition-opacity group-hover:duration-100">
					{repo.name}
				</div>
				{( repo.topics && 
					<div className="relative flex text-right">
						{ repo.topics.map((topic, i, arr) => {
							return <span key={`${repo.id}-${topic}`} className="text-fg-primary opacity-50">
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