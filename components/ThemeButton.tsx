"use client"; // Required to set the onClick.

import { useTheme } from 'next-themes'
import { themeRender, themes } from '@components/Theme'
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";

export function ThemeButton() {

	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const refThemeButton = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		setMounted(true)
	}, [])

	const changeTheme = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const curThemeIndex = themes.findIndex((t) => theme == t)
		const nextTheme = (curThemeIndex + 1) < (themes.length) ? themes[curThemeIndex + 1] : themes[0]
		setTheme(nextTheme)
		themeRender()
	})

	if (!mounted) return <MoonIcon className="z-10 block text-primary-text relative h-icon w-icon duration-100 hover:scale-[1.2]" />
	if (!theme) return <MoonIcon className="z-10 block text-primary-text relative h-icon w-icon duration-100 hover:scale-[1.2]" />

	return(
		<button id='themeSwitcher' aria-label="Theme Switcher" ref={refThemeButton}
			onClick={(e) => { if (mounted) changeTheme(e) }} >
			<MoonIcon className="z-10 block text-primary-text relative h-icon w-icon duration-100 hover:scale-[1.2]" />
		</button>
	)
}

export default ThemeButton;