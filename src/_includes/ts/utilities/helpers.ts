
/**
 *
 *
 * @export
 * @param {Array<{ selector: string, scriptPath: string }>} blocks
 */
export function loadModules(mods: Array<{ selector: string, scriptPath: string }>) {
	mods.forEach(async(mod) => {
		const containers = document.querySelectorAll(mod.selector)

		if (containers.length > 0) {
			const script = await import(`../${mod.scriptPath}`);
			// this triggers webpack to export every file in ../ as a chunk, maybe bad...
			// full literal strings will ruin the dynamic import nature though...

			containers.forEach(container => {
				const blockInstance = script.mount(container)
			})
		}
	});
}