/*
*  Submit form to Firebase
*/

let form:HTMLFormElement

export const mount = (container: Element) => {
	form = <HTMLFormElement>container
	form.addEventListener("submit", submitForm);

	console.log('contact loaded')
}

function submitForm(e:Event) {
	e.preventDefault();

	//   Get input Values
	let name:string = (<HTMLInputElement>form.querySelector("#Name")).value;
	let email:string = (<HTMLInputElement>form.querySelector("#Email")).value;
	let message:string = (<HTMLInputElement>form.querySelector("#Message")).value;

	sendContactMessage(name, email, message);
	form.reset();
}

// Save infos to Firebase
function sendContactMessage(name:string, email:string, message:string) {

}