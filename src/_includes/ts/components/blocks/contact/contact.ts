let formContainer: HTMLFormElement;
let responseMessageContainer: HTMLElement

import formValidator from '../../../../../../plugins/contact-form-validator'

export const mount = (container: HTMLElement) => {
	let validator = new formValidator(container as HTMLFormElement, '6LfhR1ohAAAAABJFXPocs9NyudnQgvZNDH1DtQ3c')
	validator.addSubmissionButton(container.querySelector('.g-recaptcha')!);


	// for (const field of container.querySelectorAll('input')) {
	// 	validator.addField(field, { customValidation: testValidator })
	// }

	// formContainer = <HTMLFormElement>container;
	// responseMessageContainer = container.querySelector('#response')!;
	// const button = container.querySelector('.g-recaptcha')!;

	// button.addEventListener('click', recaptchaHandler);
}

function testValidator(field:HTMLElement): boolean {
	console.log(field)
	return true;
}