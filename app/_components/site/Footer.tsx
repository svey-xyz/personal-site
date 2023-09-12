import ThemeButton from "@/app/_components/site/ThemeButton";

export function BasicFooter() {
	return (
		<div className="fixed bottom-0 left-0 right-0 main-padding">
			<div className="relative bottom-0 flex flex-row py-4 justify-end">
					<ThemeButton />
				</div>
		</div>
	)
}

export default BasicFooter;