import { defineType, defineField } from "@sanity-typed/types";

/**
*	Dynamically create all of the fields
*
*/

const themeColoursFieldNames = ['primaryBackground', 'primaryText']
const themeColoursFields = []

for (const name of themeColoursFieldNames) {
	themeColoursFields.push(defineField({
		name: name,
		type: 'color',
		fieldset: 'themeColours',
		validation: (Rule: any) => Rule.required()
	}))
}

const accentColoursFieldNames = ['primaryAccent', 'secondaryAccent', 'successAccent', 'failureAccent']
const accentColoursFields = []

for (const name of accentColoursFieldNames) {
	accentColoursFields.push(defineField({
		name: name,
		type: 'color',
		fieldset: 'accentColours',
		validation: (Rule: any) => Rule.custom((value: any, context: any) => {
			const path: any = context.path;
			if (path[0] == 'defaultTheme' && !value) {
				return 'Accent colours are required!';
			}

			return true
		})
	}))
}

const calculatedColourOverridesFieldNames = ['secondaryBackground', 'oppositeBackground', 'primaryBorder', 'mediumAccent']
const calculatedColourOverridesFields = []

for (const name of calculatedColourOverridesFieldNames) {
	calculatedColourOverridesFields.push(defineField({
		name: name,
		type: 'color',
		fieldset: 'calculatedColourOverrides'
	}))
}

const colourFields: any = [...themeColoursFields, ...accentColoursFields, ...calculatedColourOverridesFields]

/**
*	Add readable titles to all fields without titles
*
*/
for (const field of colourFields) {
	const nameParts = field.name.split(/(?=[A-Z])/);
	nameParts[0] = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1)
	field.title = field.title ? field.title : nameParts.join(" ")
	field.options = {
		disableAlpha: true
	}
}

const calculatedOverrideField = defineField({
	title: 'Override Calculated Colours',
	name: 'calculatedColourOverride',
	type: 'boolean',
	description: "Only use this field if you're certain you know what you're doing. The calculated values will work in most circumstances.",
	initialValue: false,
	fieldset: 'options'
})

const fieldSets = [
	{
		name: 'options',
		title: 'Theme Options',
		readOnly: false,
		options: {
			collapsible: false, // Makes the whole fieldset collapsible
			collapsed: false, // Defines if the fieldset should be collapsed by default or not
			columns: 2 // Defines a grid for the fields and how many columns it should have
		}
	},
	{
		name: 'themeColours',
		title: 'Theme Colours',
		readOnly: false,
		options: {
			collapsible: true, // Makes the whole fieldset collapsible
			collapsed: false, // Defines if the fieldset should be collapsed by default or not
			columns: 2 // Defines a grid for the fields and how many columns it should have
		}
	},
	{
		name: 'accentColours',
		title: 'Accent Colours',
		readOnly: false,
		hidden: ({ currentUser, value, parent }: any) => {
			return parent?.accentOverride == false;
		},
		options: {
			collapsible: true, // Makes the whole fieldset collapsible
			collapsed: false, // Defines if the fieldset should be collapsed by default or not
			columns: 2 // Defines a grid for the fields and how many columns it should have
		}

	},
	{
		name: 'calculatedColourOverrides',
		title: 'Calculated Colour Overrides',
		readOnly: false,
		hidden: ({ currentUser, value, parent }: any) => {
			return parent?.calculatedColourOverride == false;
		},
		options: {
			collapsible: true, // Makes the whole fieldset collapsible
			collapsed: false, // Defines if the fieldset should be collapsed by default or not
			columns: 2 // Defines a grid for the fields and how many columns it should have
		}
	}
]

export const theme = defineType({
	title: 'Site Theme',
	name: 'theme',
	type: 'document',
	groups: [
		{
			name: 'defaultThemeGroup',
			title: 'Default Theme',
		},
		{
			name: 'darkThemeGroup',
			title: 'Dark Theme',
		},
	],
	fields: [
		defineField({
			title: 'Logo',
			name: 'logo',
			type: 'image',
			description: 'Site logo displayed in header. Ideally an SVG. If no logo is provided text of the site name will appear in the header.',
			// validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Signature',
			name: 'signature',
			type: 'image',
			description: 'Signature used across the site.',
			// validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Default Theme',
			name: 'defaultTheme',
			type: 'object',
			group: 'defaultThemeGroup',
			fieldsets: fieldSets,
			fields: [
				calculatedOverrideField,
				...themeColoursFields,
				...accentColoursFields,
				...calculatedColourOverridesFields
			]
		}),
		defineField({
			title: 'Dark Theme',
			name: 'darkTheme',
			type: 'object',
			group: 'darkThemeGroup',
			fieldsets: fieldSets,
			fields: [
				calculatedOverrideField,
				defineField({
					title: 'Override Default Accents',
					name: 'accentOverride',
					type: 'boolean',
					initialValue: false,
					fieldset: 'options'
				}),
				...themeColoursFields,
				...accentColoursFields,
				...calculatedColourOverridesFields
			]
		})
	],
	preview: {
		select: {
		},
		prepare(value: any) {
			return {
				title: `Site Theme`,
			}
		}
	}
})
