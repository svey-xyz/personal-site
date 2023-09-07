import Image from 'next/image'
import nextSVG from '@public/next.svg'
import vercelSVG from '@public/vercel.svg'

import { draftMode } from 'next/headers'
// import { DocumentsCount, query } from '@components/DocumentsCount'
// import PreviewDocumentsCount from 'components/PreviewDocumentsCount'
import PreviewProvider from '@components/sanity/PreviewProvider'
import { getClient } from '@lib/sanity.client'

export default async function Home() {
  return (
		<div className="flex flex-col items-center justify-between p-24 min-h-[calc(100vh-var(--total-header-height))]">
			<div className='flex flex-col items-center w-96'>
				<h1 className=''>Work in progress</h1>
				<span className='pt-8'>This site is in active development, please come back soon.</span>
			</div>
    </div>
  )
}
