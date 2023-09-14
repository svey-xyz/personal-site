'use client'

import Image from "next/image";
import { useNextSanityImage } from 'next-sanity-image';
import { getClient } from "@/lib/sanity.client";
import { sanityImageAsset } from "@/lib/sanity.queries";


export function SanityImage({
	image, alt, width, height, sizes, preview
} : {
	image: sanityImageAsset,
	alt: string,
	width: string,
	height: string,
	sizes: string,
	preview: { token: string | undefined } | undefined
}) {
	const client = getClient(preview)
	const imageProps = useNextSanityImage(client, image);

	return <Image
		{...imageProps}
		style={{ width: width, height: height }}
		sizes={sizes}
		placeholder="blur"
		blurDataURL={image.imageAsset.metadata.lqip}
		alt={alt}
	/>
}

export default SanityImage;