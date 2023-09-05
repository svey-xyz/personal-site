// import { WebPreview, JsonView } from './previews'
import { MdSettings } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
// import { GrNavigate } from "react-icons/gr";
import { IoNavigateCircle } from "react-icons/io5";
import { BsFileText, BsFillPersonLinesFill } from "react-icons/bs";
import { RiPaintBrushFill } from "react-icons/ri";
import { FaBusinessTime, FaTags } from "react-icons/fa";
import { StructureBuilder, StructureResolverContext } from "sanity/desk";
import { types } from "@/sanityStudio/schema";
import { DocumentActionComponent, DocumentActionsContext, Template } from "sanity";
import { AiFillFileImage } from "react-icons/ai";

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["siteSettings", "navigation", "theme", "about"])



export const structure = (S: StructureBuilder) =>
	S.list().title('Content').items([
		/* SETTINGS */
		S.listItem().title('Settings').icon(MdSettings).child(
			S.list().title('Settings Documents').items([
				/* SITE SETTINGS */
				S.listItem().title('Site Settings').icon(CgWebsite).child(
					S.document().title('Site Settings').schemaType('siteSettings').documentId('siteSettings')
				),
				/* SITE NAVIGATION */
				S.listItem().title('Site Navigation').icon(IoNavigateCircle).child(
					S.document().title('Site Navigation').schemaType('navigation').documentId('navigation')
				),
				/* SITE THEME */
				S.listItem().title('Site Theme').icon(RiPaintBrushFill).child(
					S.document().title('Site Theme').schemaType('theme').documentId('theme')
				),
				/* MUX */
				S.listItem().title('Mux API').icon(MdSettings).child(
					S.document().title('Mux API').schemaType('mux.apiKey').documentId('secrets.mux')
				),
				// S.documentTypeListItem('mux.apiKey')

				// S.documentTypeListItem('mux.apiKey')
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

		/** PAGES */
		// S.documentTypeListItem('page').schemaType('page'),

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