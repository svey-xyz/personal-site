import { client } from "@sanityStudio/lib/client"
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
	return builder.image(source)
}

export default urlFor;