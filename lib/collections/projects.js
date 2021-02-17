
module.exports = (coll) => {
	const posts = [...coll.getFilteredByGlob('src/projects/**/*.md')];

	return posts.reverse();
};