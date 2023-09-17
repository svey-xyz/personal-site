import SocialIcon from "@components/site/SocialIcon";
import { aboutData, aboutQuery } from "@/lib/sanity.queries";
import { componentParamsType } from "@/lib/types";
import ThemeButton from "@components/site/ThemeButton";

export async function Footer({ componentParams }: { componentParams: componentParamsType }) {
	const [client, preview, theme] = Object.values(componentParams);
	const about: aboutData = await client.fetch(aboutQuery);
	
	return (
		<div className="fixed bottom-0 left-0 right-0 main-padding z-10">
			<div className="relative bottom-0 flex flex-row py-4 justify-between">
					{about.socials.map((social) =>
						<SocialIcon key={social._key} social={social} />
					)}
					<ThemeButton theme={theme}/>
				</div>
		</div>
	)
}

export default Footer;