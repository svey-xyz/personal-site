const urlFor = require('../../filters/sanityImageBuilder')

module.exports = async (image, classList = "", alt = "", sizes = "100vw", sizeArray = [100,400,1200]) => {
	const srcSetContent = sizeArray.map((size) => {
		const url = urlFor(image)
			.width(size)
			.auto('format')
			.url()

		return `${url} ${size}w`
	}).join(',')

	return (
		`<img 
                src="${urlFor(image).width(sizeArray[0])}"
				class="${classList}"
                srcset="${srcSetContent}"
                sizes="${sizes}"
				loading="lazy"
                width="${sizeArray[sizeArray.length - 1]}">`
	)
}