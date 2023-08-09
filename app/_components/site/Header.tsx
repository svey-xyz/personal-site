import PreviewProvider from '@/app/_components/sanity/PreviewProvider'
import { getClient } from '@/lib/sanity.client'
import HeaderButton from '@components/site/HeaderButton'
import { draftMode } from 'next/headers'

import { settingsQuery } from '@/lib/sanity.queries'

import { SiteSettings } from '@/sanity.config'
import { SanityClient } from 'next-sanity'

export default function Header({
	preview, client
}: {
	preview: {token:string|undefined}|undefined, client: SanityClient
}) {
	if (preview && preview.token) {
		return (
			<PreviewProvider token={preview.token} children={headerWrapper({ children: [previewHeader(), basicHeader({ client })]})} />
		)
	}
	return (
		headerWrapper({ children: [basicHeader({ client })] })
	)
}

function headerWrapper({children}:{children: React.ReactNode}) {
	return (
		<nav className='fixed top-0 left-0 right-0 max-w-screen z-50'>
			{children}
		</nav>
	)
}

async function basicHeader({client}:{client:SanityClient}) {
	const settings: SiteSettings = await client.fetch(settingsQuery)

	return (
		<div className="relative h-[--header-height] flex items-center justify-center bg-white z-50">
			<div className="container m-auto flex flex-row items-center justify-between ">
				<h1 className="text-[--header-item-height] leading-none font-bold tracking-tighter md:pr-8 md:text-2xl text-primary-text">
					{settings.title}
				</h1>
				{/* <h4 className={`mt-5 text-center text-lg md:pl-8 md:text-left ${styles.portableText}`}>
					<PortableText value={description} />
				</h4> */}
				<HeaderButton />

			</div>
		</div>
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
