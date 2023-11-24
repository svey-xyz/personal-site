import React from "react";
import { FaMastodon, FaGithub } from "react-icons/fa6";
import { IconType } from "react-icons";

export function SocialIcon({social } : { social:{url: string, provider: string}}) {
	const SocialIcon: IconType = (() => {
		switch(social.provider) {
			case('mastodon'):
				return FaMastodon;
			case('github'):
				return FaGithub;
			default:
				break;
		}
	})()

	return (
		<a href={social.url} target="_blank" referrerPolicy="no-referrer" aria-label={`External link to social network: ${social.provider}`}
			className="group cursor-pointer relative inline-flex items-center justify-center w-icon h-icon" >
			<SocialIcon className="relative w-full h-auto block fill-fg-primary hover:fill-accent duration-100 group-hover:scale-[1.2]"/>
		</a >
	)
}

export default SocialIcon;