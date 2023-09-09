import Image from "next/image";
import { useNextSanityImage } from 'next-sanity-image';
import { getClient } from "@/lib/sanity.client";
import { sanityImageAsset } from "@/lib/sanity.queries";


export function sanityImage({
	image, alt, width, height, preview 
} : {
	image: sanityImageAsset,
	alt: string,
	width: string,
	height: string,
	preview: { token: string | undefined } | undefined
}) {
	const client = getClient(preview)
	const imageProps = useNextSanityImage(client, image);
	const sizes = `(max-width: ${width}) ${width}, ${height}`

	return <Image
		{...imageProps}
		style={{ width: width, height: height }}
		sizes="(max-width: 200px) 200px, 200px"
		placeholder="blur"
		blurDataURL={image.imageAsset.metadata.lqip}
		alt={alt}
	/>
}

export default sanityImage;