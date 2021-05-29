// let header:Element;
// let menuButton:Element;
// let headerSizer:HTMLElement;

export const mount = (container: Element) => {
}
// export const mount = (container: Element) => {
// 	header = container;
// 	headerSizer = document.querySelector('.header-sizer')!;
// 	menuButton = document.querySelector('.header-menu-button')!;

// 	window.onscroll = function () { scrollIndicator() }
// 	window.addEventListener("resize", resize);
// 	resize();

// 	// Don't show navigation until sizer has had a chance to run, avoid showing wrong element
// 	document.querySelector('.site-navigation')!.classList.add("loaded");

// 	menuButton.addEventListener("click", () => { 
// 		console.log('menu clicked')
// 		header.classList.toggle('menu-open');
// 	});
// }

// function scrollIndicator() {
// 	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
// 	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
// 	var scrolled = (winScroll / height) * 100;
// 	document.getElementById('scrollProgressBar')!.style.width = scrolled + "%";
// }

// function resize() {
// 	headerSizer.offsetWidth <= 100 ? header.classList.add("collapsed") : header.classList.remove("collapsed", "menu-open");
// }