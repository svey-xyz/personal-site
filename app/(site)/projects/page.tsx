import { ResolvingMetadata, Metadata } from "next"

type Props = {
	params: { id: string }
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const id = params.id
	return {
		title: 'Projects',
	}
}


export default async function ProjectsPage() {
	return(
		<div>
			
		</div>
	)
}