/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import { defineConfig } from '@sanity-typed/types'
import {deskTool} from 'sanity/desk'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from '@sanityStudio/env'
import { studioTheme } from '@styles/studio.theme'
import StudioHeader from '@components/studio/StudioHeader'
import StudioLogo from '@/app/_components/studio/StudioLogo'
import { structure, schemaOptions, documentOptions } from '@/sanityStudio/structure'
import { colorInput } from '@sanity/color-input'
import { noteField } from 'sanity-plugin-note-field'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { InferSchemaValues } from '@sanity-typed/types'

const defaultDesk = deskTool({
	structure,
})
const deskPlugins = [defaultDesk, visionTool({ defaultApiVersion: apiVersion }), colorInput(), noteField(), media()]


const config = defineConfig({
  basePath: '/studio',
	name: 'xyz_studio',
	title: 'xyz studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
	schema: schemaOptions,
	plugins: deskPlugins,
	document: documentOptions,
	studio: {
		components: {
			logo: StudioLogo,
			navbar: StudioHeader
		}
	},
	theme: studioTheme,
	form: {
		// Don't use this plugin when selecting files only (but allow all other enabled asset sources)
		file: {
			assetSources: previousAssetSources => {
				return previousAssetSources.filter(assetSource => assetSource !== mediaAssetSource)
			}
		}
	}
})
export default config;

type Values = InferSchemaValues<typeof config>;
export type SiteSettings = Values["siteSettings"];