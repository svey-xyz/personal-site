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
import { project } from '@/sanityStudio/schemas/project'

const _documents = [siteSettings, navigation, theme, project]

export const types = [..._documents, post, author, category, blockContent];
