import { SocialIcon } from "@components/SocialIcon";
import EmailInsert from "@components/EmailInsert";
import { fetchUserData, fetchUserRepos, fetchUserSocials, singleRepoData } from "@/lib/fetch.data";
import ProjectCard from "@/components/ProjectCard";

/** Metadata defined in layout for top route page */
export default async function Home() {

	const repoList = await fetchUserRepos({type: 'owner', sort: 'created'});
	const userData = await fetchUserData({});
	const socials = await fetchUserSocials({});

  return (
		<div className="relative flex flex-col main-padding">
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
				{( socials &&
					socials.data.map((social) => {
						return <SocialIcon key={social.provider} social={social} />
					})
				)}
			</div>
    </div>
  )
}
