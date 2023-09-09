import TextBlock from "@/app/_components/site/TextBlock";

export default async function Home() {
  return (
		<div className="flex flex-col items-center justify-between h-full-noheader">
				<TextBlock>
					<div>
						<h1 className=''>Work in progress</h1>
						<span className='pt-8'>This site is in active development, please come back soon.</span>
					</div>
			</TextBlock>
    </div>
  )
}
