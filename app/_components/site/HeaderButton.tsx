import MenuModal from "@components/site/MenuModal";
import { siteSettings } from "@/lib/sanity.queries";

export default function HeaderButton({
	preview, settings
}: {
	preview: { token: string | undefined } | undefined, settings: siteSettings
}): React.ReactNode {

	return (
			<div>
				<input aria-label="Root Menu Button" type="checkbox"
					className="peer
					relative w-[25px] h-[25px] block z-10 cursor-pointer
					left-1/2 -translate-x-1/2 appearance-none
					transition-all duration-200
					origin-center
					before:relative before:origin-center before:rounded-full before:inline-block before:w-full before:h-full
					before:border-primary-accent before:border-solid before:border-4
					motion-safe:group-hover:before:animate-breathing

					after:absolute after:origin-center after:left-1/2 after:top-1/2 after:w-1/3 after:h-1/3 after:rounded-full after:-z-1
					after:bg-primary-accent after:border-primary-accent after:border-solid after:border
					after:transition-transform after:duration-200 after:-translate-x-1/2 after:-translate-y-1/2
					motion-safe:after:animate-pulse

					group-hover:scale-110

					checked:after:bg-linear-accent-gradient checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:scale-[3.0]"/>

			<MenuModal preview={preview} settings={settings} />

			</div>
	)
}