import { SocialIcon } from "@components/SocialIcon";
import EmailInsert from "@components/EmailInsert";
import { fetchPathContent, OCTO_USER, OCTO_USER_SOCIALS, fetchUserRepos, UserData } from "@lib/data.fetch";
import { MarkdownRenderer } from "@lib/MarkdownRenderer";
import { Base64 } from "js-base64";
import { RepoList } from "@/components/RepoList";

export default async function Home() {

	const repoList = await fetchUserRepos({type: 'owner', sort: 'created'});
	const aboutData = await fetchPathContent({ owner: OCTO_USER.data.login, repo: OCTO_USER.data.login, path:'/data/about.md'})
	const about = aboutData ? Base64.decode(aboutData.data['content']) : ``

  return (
		<div className="relative flex flex-col main-padding">
			<div className="max-w-prose">
				{(UserData && 
					<span className="block font-black">
						{UserData.name}
					</span>
				)}
				{(UserData.bio &&
					<span className="block my-2">
						{UserData.bio}
					</span>
				)}
				{(about &&
					<MarkdownRenderer className={'pb-4'}>
						{about}
					</MarkdownRenderer>
				)}
			</div>
	
			<RepoList repos={repoList}/>

			<div className="relative flex flex-row gap-2 mt-4 max-w-prose">
				<SocialIcon social={{
					url: OCTO_USER.data.html_url,
					provider: 'github'
				}}/>
				{( OCTO_USER_SOCIALS &&
					OCTO_USER_SOCIALS.data.map((social) => {
						return <SocialIcon key={social.provider} social={social} />
					})
				)}
				{(OCTO_USER.data.email &&
					<EmailInsert email={OCTO_USER.data.email} />
				)}
			</div>
    </div>
  )
}
