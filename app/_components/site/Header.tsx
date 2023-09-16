import PreviewProvider from '@/app/_components/sanity/PreviewProvider'

import { settingsQuery, settingsData } from '@/lib/sanity.queries'
import { componentParamsType } from '@/lib/types'
import SanityImage from '@/app/_components/site/SanityImage'
import ThemeButton from '@/app/_components/site/ThemeButton'
import Icon from '@/app/_components/site/Icon'

export default function Header({componentParams}:{componentParams:componentParamsType}) {
	const [client, preview, theme] = Object.values(componentParams)

	if (preview && preview.token) {
		return (
			<PreviewProvider token={preview.token} >
				<HeaderWrapper>
					<PreviewHeader/>
					<SiteHeader componentParams={componentParams} />
				</HeaderWrapper>
			</PreviewProvider>
		)
	}
	return (
		<HeaderWrapper>
			<SiteHeader componentParams={componentParams} />
		</HeaderWrapper>
	)
}

function HeaderWrapper({children}:{children: React.ReactNode}) {
	return (
		<header className='relative top-0 left-0 right-0 max-w-screen h-[--header-height]'>
			{children}
		</header>
	)
}

async function SiteHeader({ componentParams }: { componentParams: componentParamsType }) {
	const [client, preview, theme] = Object.values(componentParams);
	const settings: settingsData = await client.fetch(settingsQuery)

	return (
		<div className="relative h-full flex flex-col items-center justify-center">
			<div className="main-padding flex flex-row items-center justify-between z-50">
				<div className="relative block w-10">
					<Icon />
				</div>
				<ThemeButton theme={theme} />
			</div>
			{/* backdrop-filter doesn't play nicely with mask-image in chrome */}
			{/* otherwise this effect looks great in other browsers with- backdrop-blur mask-linear */}

		</div>
	)
}

function PreviewHeader() {
	return (
		<div className="relative h-[--preview-header-height] flex items-center justify-center z-50">
			<div className="main-padding m-auto flex flex-row">
				<span className="w-full text-center">
					You're viewing the site in preview mode! To view published content click <a href="/api/exit-preview" className='underline'>here</a>.
				</span>
			</div>
		</div>
	)
}
