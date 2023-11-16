import Link from "next/link"
import { Icon } from "@components/Icon"

function StudioHeader(props: any) {
	return (
		<div>
			<div className="flex items-center justify-between p-5">
				<Link href="/" aria-label="Blog Home" target="_blank" className="text-primary-accent flex items-center">
					<Icon args={{type:'hover'}} />
				</Link>
				<Link href="/api/preview" target="_blank" className="text-primary-accent flex items-center">
					Preview
				</Link>
			</div>
			<>{props.renderDefault(props)}</>
		</div>
	)
}

export default StudioHeader
