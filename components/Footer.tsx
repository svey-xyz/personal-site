import ThemeButton from '@components/ThemeButton'
import { IoLibrary } from "react-icons/io5";
import Icon from '@components/Icon'
import { useState, useEffect } from 'react';
import { WebsiteData } from '@/lib/data';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

export default function Footer() {
	return (
		<footer className="absolute bottom-0 left-0 right-0 w-full h-auto max-w-screen z-20">
			<div className="main-padding flex flex-col md:flex-row justify-start gap-4 py-6 flex-wrap">

				<ThemeButton />
				<MarkdownRenderer className=''>
					{WebsiteData.tools}
				</MarkdownRenderer>
			</div>
		</footer>
	)
}