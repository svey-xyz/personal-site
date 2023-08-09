import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import author from './schemas/author'


/**
 * Documents import
 */
import { navigation } from '@/sanityStudio/schemas/settings/navigation'
import { siteSettings } from '@/sanityStudio/schemas/settings/siteSettings'
import { theme } from '@/sanityStudio/schemas/settings/theme'
import { project } from '@/sanityStudio/schemas/projects/project'
import { projectTag } from '@/sanityStudio/schemas/projects/projectTag'

const _documents = [siteSettings, navigation, theme, project, projectTag]

export const types = [..._documents, post, author, category, blockContent];
