function dateConverter(date: Date): string {
	const mm = date.getMonth() + 1; // get month is 0 based
	const dd = date.getDate();
	const yyyy = date.getFullYear();

	const month = mm > 9 ? mm : `0${mm}`
	const day = dd > 9 ? dd : `0${dd}`

	return `${day}/${month}/${yyyy}`
}

export default dateConverter;