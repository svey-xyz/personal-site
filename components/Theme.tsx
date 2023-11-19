"use client";

import { HexRenderer } from '@lib/theme.bg'

import { ThemeProvider, useTheme } from 'next-themes'
import React, { ReactNode, useEffect, useState } from 'react';

export const themes = ['light', 'dark'] as const
let hexs: HexRenderer


export default function ThemeHandler({
	children
}: {
	children: ReactNode
}) {
	const [height, setHeight] = useState<number>()
	const [mounted, setMounted] = useState(false)
	

	useEffect(() => {
		setMounted(true);
		setSize();

		window.addEventListener('resize', () => {
			setSize();
		})
	}, [])

	function setSize() {
		const isMobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

		if (!isMobile) setHeight(window.innerHeight);
		const vh = height ? setHeight(height * 0.01) : 0;

		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

	

	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark"
			themes={themes.map((theme) => theme)}>
				<div className='background inset-0 absolute opacity-10 saturate-200 -z-1'/>
			{children}
		</ThemeProvider>
	)
}

export function themeRender() {
}