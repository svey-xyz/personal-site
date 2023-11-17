import '@styles/globals.css'

import Header from '@components/Header'
import { Inter } from 'next/font/google'
import Head from '@site/head'
import localFont from "next/font/local";

const inter = Inter({ subsets: ['latin'] })
const firaCode = localFont({
	src: "../_public/fonts/FiraCode/FiraCode-VF.woff2",
	variable: "--font-fira-code",
});

export default async function RootLayout({
	children,
}: {
  children: React.ReactNode,
}) {
	return (
		<Layout>
			{children}
		</Layout>
	)
}

async function Layout({
	children
}: {
	children: React.ReactNode,
}) {

	return (
		<html lang="en">
			<Head />
			<body className='relative min-h-screen'>
				<Header />
				<div className='fixed top-0 w-full select-none pointer-events-none h-24 z-10 bg-gradient-to-b from-primary-bg to-transparent
					after:absolute after:inset-0 after:bg-gradient-to-b after:from-primary-bg after:to-transparent'></div>
				<div className='fixed bottom-0 w-full select-none pointer-events-none h-24 z-10 bg-gradient-to-t from-primary-bg to-transparent
					after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary-bg after:to-transparent'></div>
				<main className='mb-24 min-h-full'>
					{children}
				</main>
			</body>
		</html>
	)
}