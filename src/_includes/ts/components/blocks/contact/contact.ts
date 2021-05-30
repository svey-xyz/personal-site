/*
*  Check URL params for success
*/

export const mount = (container: Element) => {

	const formName = container.getAttribute('name')!;
	const formResponse = new URL(window.location.href).searchParams.get(formName)
	console.log(formResponse)
	if (formResponse === "success") {
		const successMessage = <HTMLElement>container.querySelector('#success')!;
		successMessage.classList.remove('hidden');
	}
}