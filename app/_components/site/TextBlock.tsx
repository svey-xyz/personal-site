export function TextBlock({
	children
}: {
	children: React.ReactNode
}): React.ReactNode {
	return (
		<div className='relative w-full min-w-full main-padding'>
			<div className="flex flex-col items-center max-w-prose py-32 mx-auto">
				{children}
			</div>
		</div>
	)
}

export default TextBlock;