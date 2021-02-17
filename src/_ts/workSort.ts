var projectCards = Array<projectCard>();
var tagButtons = Array<HTMLElement>();

window.onload = function (): void {
	initTagSort();
	initCards();

	var loadedTag = window.location.hash;
	if (loadedTag) {
		loadedTag = loadedTag.replace('#', '');

		console.log(`url has ${loadedTag}`);
		tagSort(loadedTag);
	}

	window.addEventListener('hashchange', backPage)
}

function backPage() : void {
	console.log('back pressed')
	console.log(window.history)
	// window.location.href = prevPage
}

function initTagSort() : void {
	var buttons = document.getElementsByClassName('tag-button');

	for (let b of buttons) {
		b.addEventListener('mousedown', tagClick);
	}
}

function initCards(): void {
	var htmlCards = document.getElementsByClassName('project-card');

	for (let card of htmlCards) {
		projectCards.push(new projectCard(<HTMLElement>card));
	}
}

function tagClick(e : Event) : void {
	const target = e.target as HTMLElement
	const tag = target.getAttribute('tag')!;

	tagSort(tag)
}

function tagSort(tag : string) {

	history.replaceState(undefined, '', "#" + tag)

	for (let card of projectCards) {
		if (card.tags.includes(tag)) {
			card.container.style.display = "flex";
		} else {
			card.container.style.display = "none";
		}
	}
}

class projectCard {
	container : HTMLElement;
	tags : Array<string>;

	constructor(dom : HTMLElement) {
		this.container = dom;
		this.tags = dom.getAttribute('tags')!.split(',');
	}
}