import ThemeButton from "@/app/_components/site/ThemeButton";

export function BasicFooter() {
	return (
		<div className="absolute bottom-0 w-full">
			<div className="relative bottom-0 main-padding flex flex-row items-end py-4">
					<ThemeButton />
				</div>
		</div>
	)
}

export default BasicFooter;