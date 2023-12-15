import { project } from "@/lib/types/data.types";

export function ProjectCard({
	project
}: {
	project: project
}) {

	return (
		<div className="my-2 max-w-full group opacity-100 border-b border-accent-secondary/50 pb-1">
			<div className="relative flex flex-col">
				<a href={`/projects/${project.title}`} aria-label={`Link to project: ${project.title}`}
					className="mb-1 w-auto max-w-fit text-fg hover:text-fg/80">
					{project.title}
				</a>
				{(project.taxonomies &&
					<div className="relative flex text-right flex-wrap">
						{project.taxonomies.map((tax, i, arr) => {
							return <span key={`${project.title}-${tax.title}`} className="text-fg-primary opacity-75">
								{tax.title}{i < arr.length - 1 ? <span>,&nbsp;</span> : ''}
							</span>
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default ProjectCard;