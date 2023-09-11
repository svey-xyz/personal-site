import { defineType, defineField } from "sanity";
import { TagIcon } from "@heroicons/react/24/solid";


const skosPrimerURL: string = "https://www.w3.org/TR/2009/NOTE-skos-primer-20090818"
function skosSectionLink(sec: string, text: string) {
	const url = `${skosPrimerURL}/#${sec}`
	return <a href={url} target="_blank">{text}</a>
}

const taxonomicTermDescription = <span>Terms aim to apply to {skosSectionLink('', 'SKOS guidelines')} but are adapted to fit the requirements of this project.</span>

export const taxonomicTerm = defineType({
	title: 'Term',
	name: 'taxonomicTerm',
	type: 'document',
	icon: TagIcon,
	description: taxonomicTermDescription,
	fieldsets: [
		{
			name: 'options',
			title: 'Options',
		},
		{
			name: 'relational',
			title: 'Relational',
		},
	],
	fields: [
		defineField({
			name: 'descriptiveNote',
			title: 'Note',
			type: 'note',
			description: taxonomicTermDescription,
		}),
		defineField({
			name: 'prefLabel',
			title: 'Title',
			type: 'string',
			description: skosSectionLink('seclabel', 'Preferred Lexical Label.'),
			fieldset: 'options',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'definition',
			title: 'Description',
			type: 'string',
			fieldset: 'options',
			description: skosSectionLink('secdocumentation', 'The description supplies a complete explanation of the term.')
		}),
		defineField({
			name: 'related',
			title: 'Related Terms',
			type: 'reference',
			to: [{ type: 'taxonomicTerm' }],
			fieldset: 'relational',
			description: skosSectionLink('secassociative', 'Related terms that are not broader or narrower.'),
		}),
		defineField({
			name: 'broader',
			title: 'Broader Terms',
			type: 'reference',
			to: [{ type: 'taxonomicTerm' }],
			fieldset: 'relational',
			description: skosSectionLink('sechierarchy', 'More general terms.'),
		}),
		defineField({
			name: 'narrower',
			title: 'Narrower Terms',
			type: 'reference',
			to: [{ type: 'taxonomicTerm' }],
			fieldset: 'relational',
			description: skosSectionLink('sechierarchy', 'More specific terms.'),
		}),
	],
	preview: {
		select: {
			title: 'title',
			description: 'definition',
		},
		prepare(value: any) {
			return {
				title: value.title,
				description: value.description,
				media: TagIcon
			}
		}
	}
})