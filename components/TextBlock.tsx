export function TextBlock({
	children
}: {
	children: React.ReactNode
}): React.ReactNode {
	return (
		<div className="mt-12 flex flex-col max-w-prose">
			{children}
		</div>
	)
}

export default TextBlock;