/*
*	Modify HREF to return to previous page
*/

export const mount = (container: Element) => {
	const ref = document.referrer;
	const sameHost = ref.indexOf(window.location.protocol + "//" + window.location.host) === 0 ? true : false;
	const samePage = ref == window.location.href ? true : false;

	if (sameHost && !samePage) (<HTMLLinkElement>container).href = ref;
}