import { socialData } from "@/lib/sanity.queries";
import { capitalize } from "@/lib/stringFunctions";
import React from "react";
import dynamic from "next/dynamic";

export async function SocialIcon({ key, social }: { key: string, social: socialData }) {
	/* imported as any to avoid conflicts with svgr */
	const SocialIcon: any = dynamic(() =>
		import(`@public/icons/social/${social.socialType}.svg`)
	)

	return (
		<a key={key} href={social.url} target="_blank" aria-label={`${social.socialTitle} | ${capitalize(social.socialType)}`}
			className="group cursor-pointer relative inline-flex items-center justify-center w-icon h-icon" >
			<SocialIcon className="relative w-full h-auto block fill-primary-text hover:fill-primary-accent duration-100 group-hover:scale-[1.25]"/>
		</a >
	)
}

export default SocialIcon;