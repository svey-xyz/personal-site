/**
 * Settings
 */
import { about } from '@schemas/settings/about'
import { siteSettings } from '@schemas/settings/siteSettings'

const _settings = [about, siteSettings]

/** 
 * Objects
 */
import { basicBlockContent, extraBlockContent } from '@schemas/objects/blockContent'
import { link } from '@schemas/objects/link'
import { social } from '@schemas/objects/social'
import { textObject } from '@schemas/objects/text'
import { projectObjectsList } from '@schemas/documents/project'
import { basicDate } from '@schemas/objects/basicDate'
import { basicDocumentOptions } from '@/sanityStudio/lib/basicDocumentOptions'

const _objects = [basicBlockContent, extraBlockContent, link, social, textObject, basicDate, basicDocumentOptions, projectObjectsList]

/**
 * Documents
 */

import { project } from '@schemas/documents/project'
import { taxonomicTerm } from '@schemas/documents/taxonomy'

const _documents = [project, taxonomicTerm]

export const types = [..._settings, ..._documents, ..._objects];
