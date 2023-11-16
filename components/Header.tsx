import { componentParamsType } from '@/lib/types'
import ThemeButton from '@components/ThemeButton'
import Icon from '@components/Icon'

export default function Header({componentParams}:{componentParams:componentParamsType}) {
	const {client, preview, theme} = componentParams

	return (
		<header className='relative top-0 left-0 right-0 max-w-screen h-[--header-height]'>
			<div className="relative h-full flex flex-col items-center justify-center">
				<div className="main-padding flex flex-row items-center justify-between z-50">
					<div className="relative block w-10">
						<Icon args={{ type: 'toggle' }} />
					</div>
					<ThemeButton theme={theme} />
				</div>
				{/* backdrop-filter doesn't play nicely with mask-image in chrome */}
				{/* otherwise this effect looks great in other browsers with- backdrop-blur mask-linear */}

			</div>
		</header>
	)
}