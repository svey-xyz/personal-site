import { getUserData, getProjectData, getWebsiteData } from '@lib/data.query';

export const UserData = await (async () => { return await getUserData('data/about.md') })()
export const ProjectData = await (async () => { return await getProjectData() })()
export const WebsiteData = await (async () => { return await getWebsiteData('data/website.md')})()