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
    window.addEventListener('hashchange', backPage);
};
function backPage() {
    console.log('back pressed');
    console.log(window.history);
    // window.location.href = prevPage
}
function initTagSort() {
    var buttons = document.getElementsByClassName('tag-button');
    for (let b of buttons) {
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
    tagSort(tag);
}
function tagSort(tag) {
    history.replaceState(undefined, '', "#" + tag);
    for (let card of projectCards) {
        if (card.tags.includes(tag)) {
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
