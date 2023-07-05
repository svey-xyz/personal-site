import HeaderButton from '@site/components/HeaderButton'

export default function Header({
	title, description
}: {
	title: string, description?: any[]
}) {
	return (
		<nav className="block relative h-[75px]">
			<div className='fixed left-0 right-0 top-0 w-full max-w-screen bg-white py-[25px] z-50'>
				<div className="container mx-auto px-5 flex flex-row items-center justify-between ">
					<h1 className="text-[25px] leading-none font-bold tracking-tighter md:pr-8 md:text-2xl">
						{title}
					</h1>
					{/* <h4 className={`mt-5 text-center text-lg md:pl-8 md:text-left ${styles.portableText}`}>
						<PortableText value={description} />
					</h4> */}
          			<HeaderButton />

				</div>
			</div>
    </nav>
	)
}
