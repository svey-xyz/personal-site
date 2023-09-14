import { socialData } from "@/lib/sanity.queries";
import { capitalize } from "@/lib/stringFunctions";
import React from "react";
import MastodonIcon from '@public/socialIcons/mastodon.svg'


export function SocialIcon({ social }: { social: socialData }) {
	return (
		<a href={social.url} target="_blank" aria-label={`${social.socialTitle} | ${capitalize(social.socialType)}`}
			className="group cursor-pointer relative flex items-center justify-center text-medium-accent leading-xs w-icon h-icon text-3xl" >
			<div className="absolute left-1/2 -translate-x-1/2 w-full h-full appearance-none
					after:absolute after:overflow-hidden after:-z-1 after:inset-0 after:min-h-full after:w-full
					after:bg-primary-accent after:rounded-full after:shadow-sm
					after:duration-100 group-hover:after:scale-[0.8] group-hover:after:shadow-md
					motion-safe:group-hover:after:animate-pulse
					dark:after:bg-secondary-accent" />
			{/* <SunIcon className="relative w-[80%] block peer-checked:!hidden duration-100 group-hover:scale-[1.4]" /> */}
			<MastodonIcon className="relative w-[65%] block fill-primary-text duration-100 group-hover:scale-[1.3]" />
		</a >
	)
}

export default SocialIcon;