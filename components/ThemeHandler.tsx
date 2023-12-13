"use client";

import { mountMosaic } from '@/components/interactiveSections/pixelMosaic/pixelMosaic'
import { mountBlobs } from '@/components/interactiveSections/blobShader/blobShader'

import { ThemeProvider, useTheme } from 'next-themes'
import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { FaChevronUp } from "react-icons/fa6";

export const themes = ['light', 'dark'] as const

export default function ThemeHandler({
	children
}: {
	children: ReactNode
}) {
	const [height, setHeight] = useState<number>()
	const [mounted, setMounted] = useState(false)
	const themeContainer = useRef<HTMLDivElement>(null)
	const topChevron = useRef<HTMLDivElement>(null)
	
	useEffect(() => {
		if (mounted) return;
		setMounted(true);
		setSize();
		(async () => {
			mountBlobs(themeContainer.current)
			// initSectionFadeIn()
			const listener = () => {
				if (window.scrollY > 140) {
					topChevron.current.classList.add('is-visible')
				} else {
					topChevron.current.classList.remove('is-visible')
				}
			};
			window.addEventListener("scroll", listener, { passive: true });
			return () => {
				window.removeEventListener("scroll", listener);
			};
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

	const chevronClick = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	})
	
	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark"
			themes={themes.map((theme) => theme)}>
			<div ref={themeContainer} className='absolute inset-0 -z-1 overflow-hidden opacity-0 duration-500 transition-opacity saturate-200
				after:inset-0 after:absolute after:opacity-20 after:saturate-200 after:-z-1'/>
				<div ref={topChevron} className='reveal-section fixed bottom-8 w-full z-50'>
					<div className='relative main-padding flex flex-col justify-end items-end'>
						<FaChevronUp className="absolute w-icon h-icon cursor-pointer transition-transform duration-100 hover:scale-[1.1]"
							onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { if (mounted) chevronClick(e) }} />
					</div>
				</div>
			{children}
		</ThemeProvider>
	)
}

export function themeRender() {
}