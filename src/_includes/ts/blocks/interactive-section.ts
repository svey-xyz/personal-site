var sections = [];
window.onload = function(){
	initSections();
};

function initSections(): void {
	var interactiveSections = document.getElementsByClassName('interactive-section');
	for (var i = 0; i < interactiveSections.length; ++i) {
		var scriptType = interactiveSections[i].children[0].getAttribute('interactivescript');
		if (scriptType) {
			var dom = interactiveSections[i].children[0];
			var section = new (<any>window).interactiveScripts[scriptType](dom);
			
			sections.push(section);
		}
	}
}

