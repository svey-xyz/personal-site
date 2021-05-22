export function loadBlockFunctions(blocks:Array<{selector:string, script:any}>) {
	blocks.forEach(async(block) => {
		const containers = document.querySelectorAll(block.selector)
		const script = await block.script;

		if (containers) {
			containers.forEach(container => {
				const blockInstance = script.mount(container)
			})
		}
	});
}