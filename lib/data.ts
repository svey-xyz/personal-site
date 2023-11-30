import { getUserData, getProjectData } from '@lib/data.query';

export const UserData = await (async () => { return await getUserData('data/about.md') })()
export const ProjectData = await (async () => { return await getProjectData() })()