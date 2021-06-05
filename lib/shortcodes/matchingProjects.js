module.exports = (projects, activeTags) => {
	let activeProjects = [];

	projects.forEach(project => {
		let matchingTags = {};

		for (let i = 0; i < activeTags.length; i++) {
			if (!matchingTags[activeTags[i]._id]) {
				const element = activeTags[i]._id;
				matchingTags[element] = true;
			}
		}

		for (let j = 0; j < project.tags.length; j++) {
			if (matchingTags[project.tags[j]._id]) {
				activeProjects.push(project);
				break;
			}
		}
	});
	this.page.activeProjects = activeProjects;
	return activeProjects;
}