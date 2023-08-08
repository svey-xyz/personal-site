import PreviewProvider from '@/app/_components/sanity/PreviewProvider'
import { getClient } from '@/lib/sanity.client'
import HeaderButton from '@components/site/HeaderButton'
import { draftMode } from 'next/headers'

import { settingsQuery } from '@/lib/sanity.queries'

import { SiteSettings } from '@/sanity.config'

export default async function Header({
	title, description
}: {
	title: string, description?: any[]
}) {
	const preview = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : undefined
	const client = getClient(preview)
	const settings: SiteSettings = await client.fetch(settingsQuery)

	title = settings.title ? settings.title : title;
	// const data = await client.fetch(query)
	if (preview && preview.token) {
		return (
			<PreviewProvider token={preview.token} children={headerWrapper({children: [previewHeader(), basicHeader({ title, description })]})} />
		)
	}
	return (
		headerWrapper({ children: [basicHeader({ title, description })] })
	)
}

function headerWrapper({children}:{children: React.ReactNode}) {
	return (
		<div className='fixed top-0 left-0 right-0 max-w-screen z-50'>
			{children}
		</div>
	)
}

function basicHeader({title,description}:{title: string, description?: any[]}) {
	return (
		<nav className="relative h-[--header-height] flex items-center justify-center bg-white z-50">
			<div className="container m-auto flex flex-row items-center justify-between ">
				<h1 className="text-[--header-item-height] leading-none font-bold tracking-tighter md:pr-8 md:text-2xl text-primary-text">
					{title}
				</h1>
				{/* <h4 className={`mt-5 text-center text-lg md:pl-8 md:text-left ${styles.portableText}`}>
					<PortableText value={description} />
				</h4> */}
				<HeaderButton />

			</div>
		</nav>
	)
}

function previewHeader() {
	return (
		<div className="relative h-[--preview-header-height] flex items-center justify-center">
			<div className="container m-auto flex flex-row">
				<span className="w-full text-center">
					You're viewing the site in preview mode! To view published content click <a href="/api/exit-preview" className='underline'>here</a>.
				</span>
			</div>
		</div>
	)
}
