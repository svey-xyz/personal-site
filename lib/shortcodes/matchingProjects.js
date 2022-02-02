module.exports = (projects, activeTags, pageData) => {
	let activeProjects = [];

	projects.forEach(project => {
		let matchingTags = {};

		for (let i = 0; i < activeTags.length; i++) {
			if (!matchingTags[activeTags[i]._id]) {
				const element = activeTags[i]._id;
				matchingTags[element] = true;
			}
		}

		for (let j = 0; j < project.projectTags.length; j++) {
			if (matchingTags[project.projectTags[j]._id]) {
				activeProjects.push(project);
				break;
			}
		}
	});

	pageData.activeProjects = activeProjects;
	return activeProjects;
}