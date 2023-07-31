import { defineType, defineField } from "sanity";

export const navigation = defineType({
	title: 'Site Navigation',
	name: 'navigation',
	type: 'document',
	fields: [
		// defineField({
		// 	title: 'Primary Navigation',
		// 	name: 'primaryNavigation',
		// 	type: 'array',
		// 	description: 'Site navigation, the Home Page does not need to be added here unless you wish for it to appear in the navigation.',
		// 	of: [{ type: 'internalLink' }]
		// }),
		// defineField({
		// 	title: 'Home Page',
		// 	name: 'homePage',
		// 	type: 'reference',
		// 	description: 'Select the page to be used for the root of the site.',
		// 	to: [{ type: 'page' }],
		// })
		defineField({
			title: 'Important!',
			description: 'a custom Message...',
			name: 'myCustomNote',
			type: 'note',
			options: {
				icon: () => <Warning size={ 20} weight = "duotone" />,
				tone: 'caution',
  		},
		})
	],
	preview: {
		select: {
		},
		prepare(value: any) {
			return {
				title: `Site Navigation`,
			}
		}
	}
})
