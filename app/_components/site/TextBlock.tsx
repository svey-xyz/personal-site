export function TextBlock({
	children
}: {
	children: React.ReactNode
}): React.ReactNode {
	return (
		<div className='main-padding mt-24'>
			<div className="flex flex-col max-w-prose">
				{children}
			</div>
		</div>
	)
}

export default TextBlock;