
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

/**
 * Debounce functions for better performance
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} fn The function to debounce
 */
export const debounce = function(this: any, fn: any) {

	// Setup a timer
	let timeout: number;

	// Return a function to run debounced
	return () => {

		// Setup the arguments
		let context: any = this;
		let args: any = arguments;

		// If there's a timer, cancel it
		if (timeout) {
			window.cancelAnimationFrame(timeout);
		}

		// Setup the new requestAnimationFrame()
		timeout = window.requestAnimationFrame(function () {
			fn.apply(context, args);
		});

	}
};
