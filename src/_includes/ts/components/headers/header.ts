let header:Element;
let menuSwitch:HTMLInputElement;

export const mount = (container: Element) => {
	header = container;
	menuSwitch = header.querySelector('#menuSwitch')!;
	menuSwitch.addEventListener("click", switchMenu);
	switchMenu();

	window.onscroll = function () { scrollIndicator() }
	window.addEventListener("resize", scrollIndicator);
}

function switchMenu() {
	let menuState = menuSwitch.checked;
	header.classList[menuState ? 'add' : 'remove']('menu-open');
}

function scrollIndicator() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	document.getElementById('scrollProgressBar')!.style.width = scrolled + "%";
}