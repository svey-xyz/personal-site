
function ImageBuilder({
	props
}: {
	props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
}) {

	return (<img
		{...props}
	/>)
}

export default ImageBuilder