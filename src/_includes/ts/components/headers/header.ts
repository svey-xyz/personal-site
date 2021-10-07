let header:Element;
let menu:Element;
let menuButton:Element;
let headerSizer:HTMLElement;

export const mount = (container: Element) => {
	header = container;
	menu = header.querySelector('#menu-container')!;
	menuButton = header.querySelector('.header-menu-button')!;

	window.onscroll = function () { scrollIndicator() }
	window.addEventListener("resize", scrollIndicator);

	menuButton.addEventListener("click", () => { 
		header.classList.toggle('menu-open');
	});
}

function scrollIndicator() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	document.getElementById('scrollProgressBar')!.style.width = scrolled + "%";
}