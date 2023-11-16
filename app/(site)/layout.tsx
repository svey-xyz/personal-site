import Header from '@components/Header'
import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Head from '@site/head'
import { cookies, draftMode } from 'next/headers';
import { getClient } from '@/lib/sanity.client';
import { settingsQuery, settingsData } from '@/lib/sanity.queries';
import { Metadata, ResolvingMetadata } from 'next';
import localFont from "next/font/local";
import { componentParamsType, metadataPropsType, previewType, themeType } from '@/lib/types';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })
const firaCode = localFont({
	src: "../_public/fonts/FiraCode/FiraCode-VF.woff2",
	variable: "--font-fira-code",
});

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

	return (
		<Layout componentParams={componentParams}>
			{children}
		</Layout>
	)
}

async function Layout({
	children, componentParams
}: {
	children: React.ReactNode,
	componentParams: componentParamsType,
}) {
	const [client, preview, theme] = Object.values(componentParams);
	
	const headerHeightString = preview ?
		'[--total-header-height:calc(var(--header-height)+var(--preview-header-height))]' :
		'[--total-header-height:var(--header-height)]'

	let documentClasses = `${theme ? theme as string : ''} ${inter.className} ${firaCode.variable} ${headerHeightString}`

	return (
		<html lang="en" className={documentClasses}>
			<Head componentParams={componentParams} />
			<body className='relative min-h-screen'>
				<Header componentParams={componentParams} />
				<div className='fixed top-0 w-full select-none pointer-events-none h-24 z-10 bg-gradient-to-b from-primary-bg to-transparent
					after:absolute after:inset-0 after:bg-gradient-to-b after:from-primary-bg after:to-transparent'></div>
				<div className='fixed bottom-0 w-full select-none pointer-events-none h-24 z-10 bg-gradient-to-t from-primary-bg to-transparent
					after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary-bg after:to-transparent'></div>
				{preview ? (
					<main className='mb-24 min-h-full'>
						{children}
					</main>
				) : (
					<main className='mb-24 min-h-full'>
						{children}
					</main>
				)}
			</body>
		</html>
	)
}