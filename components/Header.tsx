import ThemeButton from '@components/ThemeButton'
import Icon from '@components/Icon'

export default function Header() {
	return (
		<header className='relative top-0 left-0 right-0 max-w-screen h-[--header-height]
				border-b border-accent-secondary/40 dark:shadow-xl shadow-lg
				after:inset-0 after:absolute after:-z-1 after:bg-bg-primary/60 dark:after:bg-bg-primary/75 after:backdrop-blur-2xl mb-6
				'>
			<div className="relative h-full flex flex-col items-center justify-center">
				<div className="main-padding flex flex-row items-center justify-between z-50">
					<div className="relative block w-10">
						<Icon />
					</div>
					<ThemeButton />
				</div>
				{/* backdrop-filter doesn't play nicely with mask-image in chrome */}
				{/* otherwise this effect looks great in other browsers with- backdrop-blur mask-linear */}

			</div>
		</header>
	)
}