import '@styles/style.globals.css'

import Header from '@components/Header'
import { Inter } from 'next/font/google'
import localFont from "next/font/local";
import ThemeHandler from '@/components/Theme';
import { Metadata, ResolvingMetadata, Viewport } from 'next/types';
import { OCTO_USER } from '@/lib/data.fetch';

type Props = {
	params: { id: string }
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const id = params.id

	return {
		title: {
			template: `%s | ${OCTO_USER.data.name}`,
			default: `${OCTO_USER.data.name}`
		},
		description: OCTO_USER.data.bio,
		generator: 'Next.js',
		applicationName: 'Next.js',
		referrer: 'origin-when-cross-origin',
		authors: [{ name: `${OCTO_USER.data.name}`, url: '/' }],
	}
}

export const viewport: Viewport = {
	themeColor: 'black',
	width: 'device-width',
	initialScale: 1
}

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
})
const monaSpace = localFont({
	src: "../../public/fonts/MonaspaceNeonVarVF[wght,wdth,slnt].woff2",
	variable: "--font-mona-space",
});

export default async function RootLayout({ children } : { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.className} ${monaSpace.variable}`} suppressHydrationWarning>
			<link rel="icon" href="/favicon.ico" sizes="any" />
			<body className='relative min-h-screen'>
				<ThemeHandler>
					<Header />
					<main className='pb-24 min-h-full '>
						{children}
					</main>
				</ThemeHandler>
			</body>
		</html>
	)
}