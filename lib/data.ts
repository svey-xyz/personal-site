import { getUserData } from '@lib/data.query';

export const UserData = await (async () => { return await getUserData('data/about.md') })()
