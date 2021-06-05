

export function loadModules(blocks: Array<{ selector: string, scriptPath: string }>) {
	blocks.forEach(async(block) => {
		const containers = document.querySelectorAll(block.selector)

		if (containers.length > 0) {
			const script = await import(`../${block.scriptPath}`);
			// this triggers webpack to export every file in ../ as a chunk, maybe bad...
			// full literal strings will ruin the dynamic import nature though...

			containers.forEach(container => {
				const blockInstance = script.mount(container)
			})
		}
	});
}