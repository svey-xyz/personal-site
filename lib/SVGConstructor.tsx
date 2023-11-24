import { ReactElement } from "react"

const SVGConstructor: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
	children,
	height = '100%',
	width = '100%',
	className = '',
}: {
	children: ReactElement,
	height?: string,
	width?: string,
	className?: string,
	})=> (

	<svg
		width = { width }
		height = { height }
		viewBox = "0 0 1860 1860"
		xmlns = "http://www.w3.org/2000/svg"
		className = { className } >
			{children}
	</svg>
)

export default SVGConstructor