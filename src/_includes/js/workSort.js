"use strict";
var projectCards = Array();
var tagButtons = Array();
window.onload = function () {
    initTagSort();
    initCards();
    var loadedTag = window.location.hash;
    if (loadedTag) {
        loadedTag = loadedTag.replace('#', '');
        console.log(`url has ${loadedTag}`);
        tagSort(loadedTag);
    }
};
function initTagSort() {
    var buttonElements = document.getElementsByClassName('tag-button');
    for (let b of buttonElements) {
        tagButtons.push(b);
        b.addEventListener('mousedown', tagClick);
    }
}
function initCards() {
    var htmlCards = document.getElementsByClassName('project-card');
    for (let card of htmlCards) {
        projectCards.push(new projectCard(card));
    }
}
function tagClick(e) {
    const target = e.target;
    const tag = target.getAttribute('tag');
    for (let b of tagButtons) {
        b.style.setProperty('font-weight', '400');
    }
    target.style.setProperty('font-weight', '900');
    tagSort(tag);
}
function tagSort(tag) {
    let all = false;
    let hashState = '#' + tag;
    if (tag == 'all') {
        all = true;
        hashState = '/work/';
    }
    history.replaceState(undefined, '', hashState);
    for (let card of projectCards) {
        if (card.tags.includes(tag) || all) {
            card.container.style.display = "flex";
        }
        else {
            card.container.style.display = "none";
        }
    }
}
class projectCard {
    constructor(dom) {
        this.container = dom;
        this.tags = dom.getAttribute('tags').split(',');
    }
}
