import { getUserData, getProjectData, getWebsiteData } from '@lib/data.query';

export const UserData = await (async () => { return await getUserData() })()
export const ProjectData = await (async () => { return await getProjectData() })()
export const WebsiteData = await (async () => { return await getWebsiteData()})()