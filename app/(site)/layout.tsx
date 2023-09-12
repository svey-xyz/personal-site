import { Analytics } from '@vercel/analytics/react';
import Header from '@components/site/Header'
import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Head from '@site/head'
import { cookies, draftMode } from 'next/headers';
import { getClient } from '@/lib/sanity.client';
import { settingsQuery, siteSettings } from '@/lib/sanity.queries';
import PreviewProvider from '@components/sanity/PreviewProvider';
import { ThemeProvider } from '@helpers/ThemeContext';

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
	const preview = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : undefined

	if (preview && preview.token) {
		return (
			<PreviewProvider token={preview.token} children={layout({children, preview})} />
		)
	}
	return (
		layout({ children, preview })
	)
}

async function layout({
	children, preview
}: {
	children: React.ReactNode,
	preview: { token: string | undefined } | undefined
}) {
	const client = getClient(preview)
	const settings: siteSettings = await client.fetch(settingsQuery)
	const headerHeightString = preview ?
		'[--total-header-height:calc(var(--header-height)+var(--preview-header-height))] mt-[--total-header-height]' :
		'[--total-header-height:var(--header-height)] mt-[--total-header-height]'

	return (
		<html lang="en" className='dark'>
			<Head settings={settings} />
			<body className={headerHeightString}>
				<div id="modal-root"></div>
				<Header preview={preview} settings={settings} />
				{preview ? (
					<main>
						{children}
					</main>
				) : (
					<main>
						{children}
					</main>
				)}
				<Analytics />
			</body>
		</html>
	)
}