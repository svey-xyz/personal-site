import TextBlock from "@components/TextBlock";

import SocialIcon from "@components/SocialIcon";
import EmailInsert from "@components/EmailInsert";
import { fetchUserData, fetchUserRepos, singleRepoData } from "@/lib/fetch.data";
import ProjectCard from "@/components/ProjectCard";

/** Metadata defined in layout for top route page */
export default async function Home() {

	const repoList = await fetchUserRepos({username: 'svey-xyz', type: 'owner', sort: 'created'});
	const userData = await fetchUserData({username: 'svey-xyz'});

  return (
		<div className="relative flex flex-col main-padding">
			<TextBlock>
				<h2>about</h2>
				<div className="flex flex-row space-x-4 mt-8 items-center">
					<EmailInsert email={``} />
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
