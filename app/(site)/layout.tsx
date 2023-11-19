import '@styles/globals.css'

import Header from '@components/Header'
import { Inter } from 'next/font/google'
import Head from '@site/head'
import localFont from "next/font/local";
import ThemeHandler from '@/components/Theme';

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
			<Head />
			<body className='relative min-h-screen'>
				<ThemeHandler>
					<Header />
					<main className='pb-24 min-h-full'>
						{children}
					</main>
				</ThemeHandler>
			</body>
		</html>
	)
}