
/** ICONS */
import { MdSettings } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";

/** HELPERS */
import { StructureBuilder } from "sanity/desk";
import { types } from "@/sanityStudio/schema";
import { DocumentActionComponent, DocumentActionsContext, Template } from "sanity";

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["siteSettings", "about"])



export const structure = (S: StructureBuilder) =>
	S.list().title('Content').items([
		/* SETTINGS */
		S.listItem().title('Settings').icon(MdSettings).child(
			S.list().title('Settings Documents').items([
				/* SITE SETTINGS */
				S.listItem().title('Settings').icon(CgWebsite).child(
					S.document().schemaType('siteSettings').documentId('siteSettings')
				),

				/* MUX */
				S.listItem().title('Mux API').icon(MdSettings).child(
					S.document().title('Mux API').schemaType('mux.apiKey').documentId('secrets.mux')
				),
			])
		),
		S.divider(),

		// /** EXPERIENCE */
		// S.listItem().title('About').icon(BsFillPersonLinesFill).child(
		// 	/* ABOUT */

		// 	S.list().title('Experiences').items([
		// 		S.documentListItem().schemaType('about').id('about'),
		// 		// S.listItem().title('About').icon(BsFillPersonLinesFill).child(
		// 		// 	S.document().schemaType('about').documentId('about'),
		// 		// ),
		// 		S.divider(),
		// 		S.documentTypeListItem('experienceTag'),
		// 		S.divider(),
		// 		S.documentTypeListItem('experience'),
		// 		S.documentTypeListItem('institution'),
		// 		S.documentTypeListItem('skill'),

		// 	])
		// ),
		// S.divider(),

		/** PROJECTS */
		S.documentTypeListItem('taxonomicTerm').title('Terms'),
		S.documentTypeListItem('project').title('Projects')
	])

export const schemaOptions = {
	types: types,
	// Filter out singleton types from the global “New document” menu options
	templates: (templates: Template<any, any>[]) => templates.filter(({ schemaType }: { schemaType: string }) => !singletonTypes.has(schemaType)),
}
export const documentOptions = {
	// For singleton types, filter out actions that are not explicitly included
	// in the `singletonActions` list defined above
	actions: (input: DocumentActionComponent[], context: DocumentActionsContext) =>
		singletonTypes.has(context.schemaType)
			? input.filter(({ action }) => action && singletonActions.has(action))
			: input,
}