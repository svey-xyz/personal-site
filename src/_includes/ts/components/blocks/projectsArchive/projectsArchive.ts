/*
*  Add sorting of projects
*/

import { updateURLParameter } from '../../../utilities/updateURLParameter'

let projectCards = Array<projectCard>();
let tagButtons = Array<HTMLElement>();
let archiveContainer:HTMLElement;
let archiveName:string;


export const mount = (container: Element) => {
	archiveContainer = <HTMLElement>container;

	initializeArchive();
}

function initializeArchive(): void {
	initElements();

	archiveName = archiveContainer.getAttribute('name')!;

	const filterTag = new URL(window.location.href).searchParams.get(archiveName)
	filterTag ? tagSelect(filterTag) : tagSelect('all')
}

function initElements() : void {
	const buttonElements = archiveContainer.querySelectorAll('.tag-button');
	const htmlCards = archiveContainer.querySelectorAll('#projectsArchive-card');

	for (let b of buttonElements) {
		tagButtons.push(<HTMLElement>b);
		b.addEventListener('mousedown', tagClick);
	}

	for (let card of htmlCards) {
		projectCards.push(new projectCard(<HTMLElement>card));
	}
}

function tagClick(e : Event) : void {
	const target = e.target as HTMLElement
	const tag = target.getAttribute('data-tag')!;
	
	tagSelect(tag)
}

function tagSelect(tag : string) : void {
	
	for (let b of tagButtons) {
		if (b.getAttribute('data-tag') != tag) b.classList.remove('active');
		else b.classList.add('active');
	}
	
	archiveSort(tag)
}

function archiveSort(tag : string) {
	let all = tag === 'all';

	window.history.replaceState('', '', updateURLParameter(window.location.href, archiveName, tag));

	for (let card of projectCards) {
		if (card.tags.includes(tag) || all) {
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
		this.tags = JSON.parse(dom.getAttribute('data-tags')!);
	}
}