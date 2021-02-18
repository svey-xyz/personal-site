"use strict";
/******** VARIABLES ********/
var ver = '0.0.3';
var mobile = false;
var height;
var vh;
const prevPage = document.referrer;
/******** INITIALIZATION ********/
;
(function () {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        mobile = true;
    }
    height = window.innerHeight;
    vh = height * 0.01;
    window.addEventListener("resize", resize);
    window.onscroll = function () { ScrollIndicator(); };
    resize();
    console.log(`JS Version is: ${ver}`);
})();
function resize() {
    if (!mobile) {
        height = window.innerHeight;
        vh = height * 0.01;
    }
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
function ScrollIndicator() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById('scrollProgressBar').style.width = scrolled + "%";
}
