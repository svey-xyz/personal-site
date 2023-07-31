import Link from "next/link"
import { MoonIcon } from "@heroicons/react/24/solid"

function StudioHeader(props: any) {
	return (
		<div>
			<div className="flex items-center justify-between p-5">
				<Link href="/" target="_blank" className="text-xyz-accent flex items-center">
					<MoonIcon className="h-6 w-6 text-xyz-accent mr-2" />
					Blog Home
				</Link>
				<Link href="/api/preview" target="_blank" className="text-xyz-accent flex items-center">
					Preview
				</Link>
			</div>
			<>{props.renderDefault(props)}</>
		</div>
	)
}

export default StudioHeader
