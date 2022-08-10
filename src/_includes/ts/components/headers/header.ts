let header:HTMLElement;
let menuSwitch:HTMLInputElement;

export const mount = (container: HTMLElement) => {
	header = container;
	menuSwitch = header.querySelector('#menuSwitch')!;

	menuSwitch.addEventListener("click", switchMenu);
	switchMenu(null);

	document.addEventListener("keydown", function (event) {
		const key = event.key; // Or const {key} = event; in ES6+
		if (key === "Escape") {
			switchMenu(null, false);
		}
	});

	window.onscroll = utils.domUtils.debounce(function () { scrollIndicator() })
	window.addEventListener("resize", utils.domUtils.debounce(scrollIndicator));
}

function switchMenu(e: Event | null, force?:boolean) {
	let menuState: boolean | undefined = force;

	if (typeof menuState === 'undefined') {
		switch (e?.target) {
			default:
				menuState = menuSwitch.checked;
				break;
		}
	}

	header.classList[menuState ? 'add' : 'remove']('menu-open');
	menuSwitch.checked = menuState;
}

function scrollIndicator() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	document.getElementById('scrollProgressBar')!.style.width = scrolled + "%";
}