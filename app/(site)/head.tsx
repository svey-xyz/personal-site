import { siteSettings } from "@/lib/sanity.queries";

export default function Head({settings}:{settings:siteSettings}) {

	return(
		<>
			<title>{settings.title}</title>
			<meta content="width=device-width, initial-scale=1"
				name="viewport" />
			<link rel="icon" href="./favicon.ico" />
		</>
	)
}