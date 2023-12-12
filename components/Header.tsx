'use client'

import ThemeButton from '@components/ThemeButton'
import Icon from '@components/Icon'
import { useState, useEffect } from 'react';

export default function Header() {
	const [animateHeader, setAnimateHeader] = useState(false);
	useEffect(() => {
		const listener = () => {
			if (window.scrollY > 140) {
				setAnimateHeader(true);
			} else setAnimateHeader(false);
		};
		window.addEventListener("scroll", listener, { passive: true });
		return () => {
			window.removeEventListener("scroll", listener);
		};
	}, []);
	return (
		<header className={`fixed top-0 left-0 right-0 max-w-screen z-50 border-b border-accent-secondary/40
				after:inset-0 after:absolute after:-z-1 after:bg-bg-primary/60 dark:after:bg-bg-primary/75 after:backdrop-blur-2xl mb-6
				transition-all ease-in-out duration-500 h-[--header-height] ${animateHeader && "shadow-md dark:shadow-lg border-accent-secondary/60 !h-[--header-height-max]"}
				`}>
			<div className={`transition-all ease-in-out duration-500 relative flex flex-col items-center justify-center h-full`}>
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