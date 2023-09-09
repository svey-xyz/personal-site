import { getClient } from "@/lib/sanity.client";
import { siteSettings } from "@/lib/sanity.queries";
import React from "react";
import ReactDOM from "react-dom";

import { useNextSanityImage } from 'next-sanity-image';
import Image from "next/image";
import SanityImage from "@/app/_components/site/sanityImage";
import PreviewProvider from "@/app/_components/sanity/PreviewProvider";



const MenuModal = ({
	preview, settings
}: {
	preview: { token: string | undefined } | undefined,
	settings: siteSettings
}) => {

	const modalContent = (
		<div className="absolute inset-0 w-full flex z-20 md:main-padding
			after:fixed after:inset-0 after:bg-primary-accent after:-z-10 after:mt-[75px] after:opacity-70">

			<div className="mt-[--total-header-height] flex flex-col h-screen w-full bg-gradient-to-b from-secondary-bg via-primary-bg to-primary-bg
					md:flex-row md:h-fit md:bg-gradient-to-r md:rounded-xl">
				<div className="border-b-2 px-6 py-6 sm:px-12 md:px-6 lg:px-12 md:border-b-0 md:border-r-2 border-secondary-accent shadow-md md:shadow-lg z-10">
					<SanityImage
						image={settings.logo}
						alt={'Site logo'}
						width={'80px'}
						height={'auto'}
						preview={preview}
					/>
				</div>

				{/* {# RIGHT SIDE WRAPPER #} */}
				<div className="relative flex flex-col h-auto p-6 w-full px-6 sm:px-12">
					{/* {# NAVIGATION CONTAINER #} */}
					<div className="relative flex h-auto flex-col md:flex-row justify-start md:items-center flex-wrap">
						{settings.title && <h1>{settings.title}</h1>}
						<div className="pt-3">{ }</div>
					</div>
				</div>
			</div>

		</div>
	)

	return ReactDOM.createPortal(
		modalContent,
		document.getElementById("modal-root")!
	);
};

export default MenuModal