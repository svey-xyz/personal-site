import ThemeButton from "@components/site/ThemeButton";
import { SanityClient } from "next-sanity";

export function Footer({
	client, theme
}:{
	client:SanityClient,
	theme:string,
}) {
	return (
		<div className="fixed bottom-0 left-0 right-0 main-padding">
			<div className="relative bottom-0 flex flex-row py-4">
					<ThemeButton theme={theme}/>
				</div>
		</div>
	)
}

export default Footer;