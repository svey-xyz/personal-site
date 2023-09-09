import PreviewProvider from '@/app/_components/sanity/PreviewProvider'
import HeaderButton from '@components/site/HeaderButton'

import { siteSettings } from '@/lib/sanity.queries'

export default function Header({
	preview, settings
}: {
	preview: {token:string|undefined}|undefined, settings: siteSettings
}) {
	if (preview && preview.token) {
		return (
			<PreviewProvider token={preview.token} children={headerWrapper({ children: [previewHeader(), basicHeader({ preview, settings })]})} />
		)
	}
	return (
		headerWrapper({ children: [basicHeader({ preview, settings })] })
	)
}

function headerWrapper({children}:{children: React.ReactNode}) {
	return (
		<nav className='fixed top-0 left-0 right-0 max-w-screen z-50'>
			{children}
		</nav>
	)
}

async function basicHeader({settings, preview}:{settings:siteSettings, preview: { token: string | undefined } | undefined}) {
	return (
		<div className="relative h-[--header-height] flex items-center justify-center bg-secondary-bg z-50">
			<div className="main-padding flex flex-row items-center justify-between">
				<h1 className="leading-none font-black text-[25px] text-primary-text">
					{settings.title}
				</h1>
				<HeaderButton preview={preview} settings={settings}/>
			</div>
		</div>
	)
}

function previewHeader() {
	return (
		<div className="relative h-[--preview-header-height] flex items-center justify-center">
			<div className="main-padding m-auto flex flex-row">
				<span className="w-full text-center">
					You're viewing the site in preview mode! To view published content click <a href="/api/exit-preview" className='underline'>here</a>.
				</span>
			</div>
		</div>
	)
}
