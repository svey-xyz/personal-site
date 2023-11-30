import { project } from "@/lib/types/data.types";



export function ProjectCard({
	project
}: {
	project: project
}) {

	return (
		<a href={`/projects/${project.title}`} className="my-2 max-w-full group opacity-100">
			<div className="relative py-4 px-2 flex flex-col md:flex-row justify-between w-full border border-bg-primary/40 rounded
				after:absolute after:inset-0 after:-z-1 after:backdrop-blur-3xl after:bg-bg/5 group-hover:after:bg-bg/30
				after:duration-[1500ms] after:transition-colors group-hover:after:duration-100">
				<div className="text-fg-primary opacity-80 group-hover:opacity-100
					duration-[1500ms] transition-opacity group-hover:duration-100">
					{project.title}
				</div>
				{(project.taxonomies && 
					<div className="relative flex text-right">
						{project.taxonomies.map((tax, i, arr) => {
							return <span key={`${project.title}-${tax.title}`} className="text-fg-primary opacity-50">
								{ tax.title }{ i < arr.length - 1 ? <span>,&nbsp;</span> : '' }
							</span>
						}) }
					</div>
					)}
			</div>
		</a>
	)
}

export default ProjectCard;