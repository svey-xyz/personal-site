import { SocialIcon } from "@components/SocialIcon";
import EmailInsert from "@components/EmailInsert";
import { fetchPathContent, OCTO_USER, OCTO_USER_SOCIALS, fetchUserRepos, singleRepoData } from "@/lib/data.fetch";
import ProjectCard from "@/components/ProjectCard";
import { MarkdownRenderer } from "@lib/MarkdownRenderer";
import { Base64 } from "js-base64";

export default async function Home() {

	const repoList = await fetchUserRepos({type: 'owner', sort: 'created'});
	const aboutData = await fetchPathContent({ owner: OCTO_USER.data.login, repo: OCTO_USER.data.login, path:'/data/about.md'})
	const about = aboutData ? Base64.decode(aboutData.data['content']) : ``

  return (
		<div className="relative flex flex-col main-padding">
			{(OCTO_USER && 
				<span className="block font-black">
					{OCTO_USER.data.name}
				</span>
			)}
			{(OCTO_USER.data.bio &&
				<span className="block my-2">
					{OCTO_USER.data.bio}
				</span>
			)}
			{(about &&
				<MarkdownRenderer className={'pb-4'}>
					{about}
				</MarkdownRenderer>
			)}
	
			<h2>projects</h2>
			{( repoList &&
				repoList.data.map((repo) => {
					if (repo.topics?.indexOf(process.env.PUBLISH_REPO_KEY!) == -1) return
					return (
						<ProjectCard key={repo.id} repo={(repo as singleRepoData)} />
					)
				})
			)}
			<div className="relative flex flex-row gap-2 mt-4">
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
