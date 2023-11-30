import { SocialIcon } from "@components/SocialIcon";
import EmailInsert from "@components/EmailInsert";
import { UserData } from "@lib/data";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { RepoList } from "@components/RepoList";

export default async function Home() {

  return (
		<div className="relative flex flex-col main-padding">
			<div className="">
				{(UserData && 
					<span className="block font-black max-w-prose">
						{UserData.name}
					</span>
				)}
				{(UserData.bio &&
					<span className="block my-2 max-w-prose mb-6">
						{UserData.bio}
					</span>
				)}
				{(UserData.about &&
					<MarkdownRenderer className={'pb-4 max-w-prose-full'}>
						{UserData.about}
					</MarkdownRenderer>
				)}
			</div>
	
			<RepoList projects={UserData.featured} title='featured' />

			<div className="relative flex flex-row gap-2 mt-4 max-w-prose">
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
