import { SocialIcon } from "@components/SocialIcon";
import EmailInsert from "@components/EmailInsert";
import { UserData, WebsiteData } from "@lib/data";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ProjectsList } from "@components/ProjectsList";
import RadialProgress from "@/components/RadialProgress";

export default async function Home() {
const initialAnimationDelay = 300
const animationDelayIncrease = 200
return (
	<div className="relative flex flex-col flex-grow">
		<div className="relative flex flex-col main-padding">
			<section id="user_data" className="">
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
				<div className="relative flex flex-row gap-2 my-4 max-w-prose">
					{(UserData.socials &&
						UserData.socials.map((social) => {
							return <SocialIcon key={social.provider} social={social} />
						})
					)}
					{(UserData.email &&
						<EmailInsert email={UserData.email} />
					)}
				</div>
				{/* {(UserData.about &&
					<MarkdownRenderer className={'pb-4 max-w-prose-full'}>
						{UserData.about}
					</MarkdownRenderer>
				)} */}
			</section>
	
			<ProjectsList projects={UserData.featured} title='featured' className='mt-8' filterable={false} />			
    </div>
		<div className="relative mt-12 flex flex-col flex-grow border-t border-accent-secondary/40 dark:shadow-xl shadow-lg -mb-[--bottom-spacing] pb-[--bottom-spacing] z-10
				after:inset-0 after:absolute after:-z-1 after:bg-bg-primary/60 dark:after:bg-bg-primary/75 after:backdrop-blur-2xl">
				<div className="main-padding mt-8">
					<section id="about" className="max-w-prose">
						<h2 className="">person</h2>
						<h3>about</h3>
						<MarkdownRenderer>
							{UserData.about}
						</MarkdownRenderer>
					</section>
					
					<section id="site_info" className="max-w-prose">
						<h2 className="mt-8">website</h2>
						<h3>scores</h3>
						<div className="flex flex-row w-full my-6 flex-wrap gap-y-12">
							{ Object.entries(WebsiteData.scores).map((score, i, arr) => {
								return <RadialProgress key={score[0]} size={60} progress={score[1]} title={score[0]}
									animationDelay={initialAnimationDelay + animationDelayIncrease * i} className="basis-1/2 sm:basis-1/4" />
							}) }
						</div>
						<MarkdownRenderer>
							{WebsiteData.aboutScores}
						</MarkdownRenderer>
						<h3>about</h3>
						<MarkdownRenderer>
							{WebsiteData.about}
						</MarkdownRenderer>
					</section>
				</div>
		</div>
	</div>
)}
