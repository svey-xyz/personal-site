import { project, taxonomy } from "@lib/types/data.types";

export function taxonomiesFromProjects(projects: Array<project>): Array<taxonomy> {
	let taxonomyTitles: Array<string> = []
	let taxonomies: Array<taxonomy> = []
	projects.forEach((project) => {
		project.taxonomies.forEach((taxonomy) => {
			if (taxonomyTitles.indexOf(taxonomy.title) == -1) {
				taxonomyTitles.push(taxonomy.title)
				taxonomies.push(taxonomy)
			}
		})
	})
	return taxonomies.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)) // return alphabetized
}