import Image from "next/image";

function StudioLogo(props: any) {
	const { renderDefault, title } = props;

	return (
		<div className="flex items-center space-x-2 pl-3">
			<span>xyz</span>
			{/* <Image
				className="rounded-full object-cover"
				height={50}
				width={50}
				src={""}
				alt="Logo"
			/> */}
			<>{renderDefault(props)}</>
		</div>
	)
}

export default StudioLogo