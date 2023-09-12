import TextBlock from "@/app/_components/site/TextBlock";
import { getClient } from "@/lib/sanity.client";
import { settingsQuery, siteSettings } from "@/lib/sanity.queries";
import { draftMode } from "next/headers";

import { PortableText } from '@portabletext/react'
import { portableTextComponents } from "@/lib/portableTextComponenets";

/** Metadata defined in layout for top route page */
export default async function Home() {
	const preview = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : undefined

	const client = getClient(preview)
	const settings: siteSettings = await client.fetch(settingsQuery)

  return (
		<div className="flex flex-col items-center justify-between h-full-noheader text-center leading-8">
			<TextBlock>
				<h1 className='mb-8'>Work in progress</h1>
				<PortableText value={settings.description} components={portableTextComponents}/>
			</TextBlock>
    </div>
  )
}
