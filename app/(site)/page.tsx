import { SocialIcon } from "@components/SocialIcon";
import EmailInsert from "@components/EmailInsert";
import { UserData } from "@lib/data";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ProjectsList } from "@components/ProjectsList";
import RadialProgress from "@/components/RadialProgress";

export default async function Home() {

return (
	<div className="relative flex flex-col flex-grow">
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
			</div>
	
			<ProjectsList projects={UserData.featured} title='featured' className='mt-8' />

			
    </div>
		<div className="relative mt-12 flex flex-col flex-grow border-t border-accent-secondary/40 dark:shadow-xl shadow-lg
				after:inset-0 after:absolute after:-z-1 after:bg-bg-primary/80 after:backdrop-blur-2xl">
				<div className="main-padding mt-8">
					<h2 className="opacity-75">about</h2>

					<MarkdownRenderer>
						{UserData.about}
					</MarkdownRenderer>

					{/* <div className="relative rounded-full h-icon w-icon bg-slate-300
">

					</div> */}
					<div className="flex flex-col md:flex-row gap-16 mt-6">
					<RadialProgress size={60} progress={79} title='performance' />
					<RadialProgress size={60} progress={100} animationDelay={500} title='accessibility' />
					<RadialProgress size={60} progress={92} animationDelay={1000} title='best practices' />
					<RadialProgress size={60} progress={100} animationDelay={1500} title='seo' />

					</div>



					
						


					
					
				</div>
		</div>
	</div>
)}
