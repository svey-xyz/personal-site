let header:Element;
let headerSizer:HTMLElement;

export const mount = (container: Element) => {
	header = container;
	headerSizer = document.querySelector('.header-sizer')!;

	window.onscroll = function () { scrollIndicator() }
	window.addEventListener("resize", resize);
	resize();

	// Don't show navigation until sizer has had a chance to run, avoid showing wrong element
	const siteNavigation = document.querySelector('.site-navigation')!
	siteNavigation.classList.add("loaded")
}

function scrollIndicator() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	document.getElementById('scrollProgressBar')!.style.width = scrolled + "%";
}

function resize() {
	headerSizer.offsetWidth <= 100 ? header.classList.add("collapsed") : header.classList.remove("collapsed");
}