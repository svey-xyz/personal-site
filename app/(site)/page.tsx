import { SocialIcon } from "@components/SocialIcon";
import EmailInsert from "@components/EmailInsert";
import { fetchPathContent, OCTO_USER, OCTO_USER_SOCIALS, fetchUserRepos, UserData } from "@lib/data.fetch";
import { MarkdownRenderer } from "@lib/MarkdownRenderer";
import { Base64 } from "js-base64";
import { RepoList } from "@/components/RepoList";

export default async function Home() {

	const repoList = await fetchUserRepos({type: 'owner', sort: 'created'});

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
				{(UserData.about &&
					<MarkdownRenderer className={'pb-4'}>
						{UserData.about}
					</MarkdownRenderer>
				)}
			</div>
	
			<RepoList repos={repoList}/>

			<div className="relative flex flex-row gap-2 mt-4 max-w-prose">
				<SocialIcon social={{
					url: OCTO_USER.data.html_url,
					provider: 'github'
				}}/>
				{( UserData.socials &&
					UserData.socials.map((social) => {
						return <SocialIcon key={social.provider} social={social} />
					})
				)}
				{(UserData.email &&
					<EmailInsert email={UserData.email} />
				)}
			</div>
    </div>
  )
}
