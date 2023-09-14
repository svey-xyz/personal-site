import { Analytics } from '@vercel/analytics/react';
import Header from '@components/site/Header'
import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Head from '@site/head'
import { cookies, draftMode } from 'next/headers';
import { getClient } from '@/lib/sanity.client';
import { settingsQuery, settingsData } from '@/lib/sanity.queries';
import PreviewProvider from '@components/sanity/PreviewProvider';
import { Metadata, ResolvingMetadata } from 'next';
import { SanityClient } from 'next-sanity';
import { ReactNode } from 'react';
import { componentParamsType, metadataPropsType, previewType, themeType } from '@/lib/types';

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(
	{ params }: metadataPropsType,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const preview = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : undefined
	const client = getClient(preview)

	const settings: settingsData = await client.fetch(settingsQuery)
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
	const defaultTheme = "dark";
	const cookieValue = cookies().get("theme")?.value || "";
	const isTheme = cookieValue === defaultTheme || cookieValue === "light";
	const theme: themeType = isTheme ? cookieValue : defaultTheme;

	const preview: previewType = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : undefined
	const client = getClient(preview)

	const componentParams: componentParamsType = {
		client: client,
		preview: preview,
		theme: theme
	}

	if (preview && preview.token) {
		return (
			<PreviewProvider token={preview.token} children={layout({ children, componentParams })} />
		)
	}
	return (
		layout({ children, componentParams })
	)
}

async function layout({
	children, componentParams
}: {
	children: React.ReactNode,
	componentParams: componentParamsType,
}) {
	const [client, preview, theme] = Object.values(componentParams);
	
	const headerHeightString = preview ?
		'[--total-header-height:calc(var(--header-height)+var(--preview-header-height))] mt-[--total-header-height]' :
		'[--total-header-height:var(--header-height)] mt-[--total-header-height]'

	return (
		<html lang="en" className={theme ? theme as string: ''}>
			<Head componentParams={componentParams} />
			<body className={headerHeightString}>
				<div id="modal-root"></div>
				<Header componentParams={componentParams} />
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