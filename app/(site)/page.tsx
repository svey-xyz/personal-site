import TextBlock from "@components/TextBlock";
import { getClient } from "@/lib/sanity.client";
import { settingsQuery, settingsData, aboutData, aboutQuery, socialData } from "@/lib/sanity.queries";
import { draftMode } from "next/headers";

import { PortableText } from '@portabletext/react'
import { portableTextComponents } from "@/lib/portableTextComponenets";
import SocialIcon from "@components/SocialIcon";
import EmailInsert from "@components/EmailInsert";
import { fetchUserData, fetchUserRepos, singleRepoData } from "@/lib/fetch.data";
import ProjectCard from "@/components/ProjectCard";

/** Metadata defined in layout for top route page */
export default async function Home() {
	const preview = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : undefined

	const client = getClient(preview)
	const settings: settingsData = await client.fetch(settingsQuery)
	const about: aboutData = await client.fetch(aboutQuery);

	const repoList = await fetchUserRepos({username: 'svey-xyz', type: 'owner', sort: 'created'});
	const userData = await fetchUserData({username: 'svey-xyz'});
	// data.data.forEach(repo => {
	// 	console.log(repo.full_name)

	// });

  return (
		<div className="relative flex flex-col main-padding">
			
			<TextBlock>
				<PortableText value={settings.summary} components={portableTextComponents}/>
			</TextBlock>
			<TextBlock>
				<h2>about</h2>
				<PortableText value={about.bio} components={portableTextComponents} />
				<div className="flex flex-row space-x-4 mt-8 items-center">
					{about.socials.map((social: socialData) => {
							return <SocialIcon key={social._key} social={social} />
						}
					)}
					<EmailInsert email={about.email} />
				</div>
			</TextBlock>
			{( repoList && repoList.data.map((repo) => {
				if (repo.topics?.indexOf(process.env.PUBLISH_REPO_KEY!) == -1) return
				return (
					<ProjectCard key={repo.id} repo={(repo as singleRepoData)} />
				)
			})

			)}
    </div>
  )
}
