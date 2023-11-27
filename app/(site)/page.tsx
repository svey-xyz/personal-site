import { SocialIcon } from "@components/SocialIcon";
import EmailInsert from "@components/EmailInsert";
import { fetchReadme, fetchUserData, fetchUserRepos, fetchUserSocials, singleRepoData } from "@/lib/data.fetch";
import ProjectCard from "@/components/ProjectCard";
import { MarkdownRenderer } from "@lib/MarkdownRenderer";
// import about from '@data/about.mdx'
/** Metadata defined in layout for top route page */
export default async function Home() {

	const repoList = await fetchUserRepos({type: 'owner', sort: 'created'});
	const userData = await fetchUserData({});
	const socials = await fetchUserSocials({});

  return (
		<div className="relative flex flex-col main-padding">
			{( userData && 
				<span className="block font-black">
					{userData.data.name}
				</span>
			)}
			{(userData.data.bio &&
				<span className="block my-2 pb-6">
					{userData.data.bio}
				</span>
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
					url: userData.data.html_url,
					provider: 'github'
				}}/>
				{( socials &&
					socials.data.map((social) => {
						return <SocialIcon key={social.provider} social={social} />
					})
				)}
				{(userData.data.email &&
					<EmailInsert email={userData.data.email} />
				)}
			</div>
    </div>
  )
}
