import { capitalize } from "@lib/utils/stringUtils";
import React from "react";
import dynamic from "next/dynamic";

export function SocialIcon({social } : { social:{url: string, provider: string}}) {
	/* imported as any to avoid conflicts with svgr */
	const SocialIcon: any = dynamic(() =>
		import(`@public/icons/social/${social.provider}.svg`)
	)

	return (
		<a href={social.url} target="_blank" referrerPolicy="no-referrer" aria-label={`External link to social network: ${social.provider}`}
			className="group cursor-pointer relative inline-flex items-center justify-center w-icon h-icon" >
			<SocialIcon className="relative w-full h-auto block fill-fg-primary hover:fill-accent duration-100 group-hover:scale-[1.25]"/>
		</a >
	)
}

export default SocialIcon;