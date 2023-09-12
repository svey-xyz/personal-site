import { siteSettings } from "@/lib/sanity.queries";
import ReactDOM from "react-dom";

import SanityImage from "@components/site/sanityImage";
import BasicFooter from "@components/site/Footer";



const MenuModal = ({
	preview, settings
}: {
	preview: { token: string | undefined } | undefined,
	settings: siteSettings
}) => {

	const modalContent = (
		<div className="mt-[--total-header-height] absolute inset-0 w-full flex z-20 md:main-padding
			after:fixed after:inset-0 after:bg-primary-accent after:-z-10 after:mt-[75px] after:opacity-70">

			<div className="flex flex-col h-screen w-full bg-gradient-to-br from-primary-bg to-secondary-bg shadow-md 
					md:mt-12 md:flex-row md:h-fit md:bg-gradient-to-r md:rounded-xl md:shadow-lg">
				<div className="border-b-2 px-6 py-6 sm:px-12 md:px-6 lg:px-12 md:border-b-0 md:border-r-2 border-secondary-accent z-10">
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
					<div className="relative flex h-full flex-col md:flex-row justify-start md:items-center flex-wrap">
						{settings.title && <span className="leading-none font-black text-[25px] text-primary-text">{settings.title}</span>}
						<div className="pt-3">{ }</div>
					</div>
				</div>
			</div>
			
			<BasicFooter />

		</div>
	)

	return ReactDOM.createPortal(
		modalContent,
		document.getElementById("modal-root")!
	);
};

export default MenuModal