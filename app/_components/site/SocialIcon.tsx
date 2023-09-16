import { socialData } from "@/lib/sanity.queries";
import { capitalize } from "@/lib/stringFunctions";
import React from "react";
import dynamic from "next/dynamic";

export async function SocialIcon({ social }: { social: socialData }) {
	/* imported as any to avoid conflicts with svgr */
	const SocialIcon: any = dynamic(() =>
		import(`@public/icons/social/${social.socialType}.svg`)
	)

	return (
		<a href={social.url} target="_blank" aria-label={`${social.socialTitle} | ${capitalize(social.socialType)}`}
			className="group cursor-pointer relative flex items-center justify-center w-icon h-icon
				after:absolute after:inset-0 after:bg-primary-accent after:rounded-full after:-z-1
				after:duration-100 hover:after:scale-[0.8] motion-safe:hover:after:animate-pulse
				dark:after:bg-secondary-accent" >
			
			<SocialIcon className="relative w-[85%] h-auto block fill-primary-text duration-100 group-hover:scale-[1.3]"/>
		</a >
	)
}

export default SocialIcon;