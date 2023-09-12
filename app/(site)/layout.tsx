import { Analytics } from '@vercel/analytics/react';
import Header from '@components/site/Header'
import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Head from '@site/head'
import { cookies, draftMode } from 'next/headers';
import { getClient } from '@/lib/sanity.client';
import { settingsQuery, siteSettings } from '@/lib/sanity.queries';
import PreviewProvider from '@components/sanity/PreviewProvider';
import { Metadata, ResolvingMetadata } from 'next';

const inter = Inter({ subsets: ['latin'] })

type Props = {
	params: { id: string }
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const preview = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : undefined
	const client = getClient(preview)
	const settings: siteSettings = await client.fetch(settingsQuery)
	const titleTemplate = `${settings.title} | %s`
	
	return {
		title: {
			template: titleTemplate,
			default: settings.title,
		},
		description: "Generic description.",
		keywords: ['Next.js', 'React', 'JavaScript'],
		authors: [{ name: 'svey', url: 'https://svey.xyz' }],
		colorScheme: 'dark',
		creator: 'Hayden Soule',
		publisher: 'Hayden Soule',
	}
}

export default async function RootLayout({
	children,
}: {
  children: React.ReactNode,
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

	const defaultTheme = "dark";
	const cookieValue = cookies().get("theme")?.value || "";
	const isTheme = cookieValue === defaultTheme || cookieValue === "light";
	const theme = isTheme ? cookieValue : defaultTheme;

	return (
		<html lang="en" className={theme}>
			<Head settings={settings} />
			<body className={headerHeightString}>
				<div id="modal-root"></div>
				<Header preview={preview} settings={settings} theme={theme} />
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