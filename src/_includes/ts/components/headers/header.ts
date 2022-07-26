let header:HTMLElement;
let menuSwitch:HTMLInputElement;
let menuBackground:HTMLElement;

export const mount = (container: HTMLElement) => {
	header = container;
	menuSwitch = header.querySelector('#menuSwitch')!;
	menuBackground = header.querySelector('#menu-container #menu-background')!;
	console.log(menuBackground)

	menuSwitch.addEventListener("click", switchMenu);
	menuBackground.addEventListener("click", switchMenu);
	switchMenu(null);

	window.onscroll = utils.domUtils.debounce(function () { scrollIndicator() })
	window.addEventListener("resize", utils.domUtils.debounce(scrollIndicator));
}

function switchMenu(e: Event | null) {
	switch (e?.target) {
		case menuBackground:
			menuSwitch.checked = false;
			header.classList['remove']('menu-open');
			break;
		default:
			let menuState = menuSwitch.checked;
			header.classList[menuState ? 'add' : 'remove']('menu-open');
			break;
	}
}

function scrollIndicator() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	document.getElementById('scrollProgressBar')!.style.width = scrolled + "%";
}