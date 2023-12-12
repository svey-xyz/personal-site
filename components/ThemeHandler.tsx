"use client";

import { mountMosaic } from '@/components/interactiveSections/pixelMosaic/pixelMosaic'
import { mountBlobs } from '@/components/interactiveSections/blobShader/blobShader'

import { ThemeProvider, useTheme } from 'next-themes'
import React, { ReactNode, useEffect, useState, useRef } from 'react';

export const themes = ['light', 'dark'] as const

export default function ThemeHandler({
	children
}: {
	children: ReactNode
}) {
	const [height, setHeight] = useState<number>()
	const [mounted, setMounted] = useState(false)
	const themeContainer = useRef<HTMLDivElement>(null)
	
	useEffect(() => {
		if (mounted) return;
		setMounted(true);
		setSize();
		(async () => {
			mountBlobs(themeContainer.current)
			// initSectionFadeIn()
		})()

	
	}, [])

	/** HUGELY impacts page performance */
	async function initSectionFadeIn() {
		const sections = document.querySelectorAll('section')
		sections.forEach((section, i, arr) => {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					(entry.isIntersecting) ? section.classList.add('is-visible') : section.classList.remove('is-visible')
				})
			});
			observer.observe(section);
			return () => observer.unobserve(section);
		})

		window.addEventListener('resize', () => {
			setSize();
		}, { passive: true })
	}

	function setSize() {
		const isMobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

		if (!isMobile) setHeight(window.innerHeight);
		const vh = height ? setHeight(height * 0.01) : 0;

		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
	
	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark"
			themes={themes.map((theme) => theme)}>
			<div ref={themeContainer} className=' absolute inset-0 -z-1 overflow-hidden opacity-0 duration-500 transition-opacity saturate-200
				after:inset-0 after:absolute after:opacity-20 after:saturate-200 after:-z-1'/>
			{children}
		</ThemeProvider>
	)
}

export function themeRender() {
}