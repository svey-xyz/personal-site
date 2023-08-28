import { defineArrayMember, defineField, defineType } from '@sanity-typed/types'


/** 
 * Objects
 */
import blockContent from '@schemas/objects/blockContent'
import { link } from '@schemas/objects/link'
import { social } from '@schemas/objects/social'


const _objects = [blockContent, link, social]


/**
 * Documents
 */
import { navigation } from '@schemas/settings/navigation'
import { siteSettings } from '@schemas/settings/siteSettings'
import { theme } from '@schemas/settings/theme'
import { project } from '@schemas/projects/project'
import { projectTag } from '@schemas/projects/projectTag'
import { mux } from '@/sanityStudio/schemas/settings/mux.api'

const _documents = [siteSettings, navigation, theme, project, projectTag, mux]


/**
 * Projects
 */
// import { aboutSection } from "@objects/aboutSection";
import { textObject } from '@schemas/projects/projectObjects/textObject'
import { embedObject } from '@schemas/projects/projectObjects/embedObject'
import { gallery } from '@schemas/projects/projectObjects/gallery'
import { video } from '@schemas/projects/projectObjects/video'

const _projectObjects = [textObject, embedObject, gallery, video]
const projectObjects = defineType({
	title: 'Project Items',
	name: 'projectObjects',
	type: 'array',
	of: [
		defineArrayMember({ type: textObject.name }),
		defineArrayMember({ type: embedObject.name }),
		defineArrayMember({ type: gallery.name }),
		defineArrayMember({
			title: 'Video file',
			name: 'video',
			type: 'mux.video',
		}),
	],

})

export const types = [..._documents, ..._objects, ..._projectObjects, projectObjects];
