export function TextBlock({
	children
}: {
	children: React.ReactNode
}): React.ReactNode {
	return (
		<div className='relative w-full min-w-full
			after:absolute after:inset-0 after:-z-1 after:bg-primary-bg after:bg-gradient-to-br after:from-primary-bg after:to-secondary-bg'>
			<div className="flex flex-col items-center max-w-prose-full py-32 mx-auto">
				{children}
			</div>
		</div>
	)
}

export default TextBlock;