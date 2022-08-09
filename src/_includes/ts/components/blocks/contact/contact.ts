/*
*  Check URL params for success
*/

import { load } from 'recaptcha-v3'
let formContainer: HTMLFormElement;
let responseMessageContainer: HTMLElement

export const mount = (container: HTMLElement) => {
	formContainer = <HTMLFormElement>container;
	responseMessageContainer = container.querySelector('#response')!;
	const button = container.querySelector('.g-recaptcha')!;

	button.addEventListener('click', recaptchaHandler);
}

async function recaptchaHandler(e: Event) {
	e.preventDefault();
	e.stopPropagation();

	const recaptcha = await load('6LfhR1ohAAAAABJFXPocs9NyudnQgvZNDH1DtQ3c', { autoHideBadge: true })
	const token = await recaptcha.execute('submit')

	const formData = new FormData(formContainer);
	formData.append('token', token)

	const url = formContainer.getAttribute('action')!;
	const request = new XMLHttpRequest();
	request.responseType = "json"
	request.open("POST", url, true);

	let data:any = {};

	for (let [key, prop] of formData) {
		data[key] = prop;
	}

	request.onreadystatechange = function () {
		if (request.readyState === 4) {

			const responseColour = request.status == 200 ? 'var(--success-accent)' : 'var(--failure-accent)'

			responseMessageContainer.innerHTML = request.response.message;
			responseMessageContainer.classList.remove('hidden');
			responseMessageContainer.style.color = responseColour;
		}
	}

	//Send the proper header information along with the request
	request.setRequestHeader("Content-type", "application/json");
	request.send(JSON.stringify(data, null, 2))

}
