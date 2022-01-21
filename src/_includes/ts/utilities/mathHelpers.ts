/**
 * Map a given range of numbers to a new range
 *
 * @export
 * @param {number} x
 * @param {number} cMin
 * @param {number} cMax
 * @param {number} nMin
 * @param {number} nMax
 * @return {*} 
 * @memberof Functions
 */
export function map(x: number, cMin: number, cMax: number, nMin: number, nMax: number): number {
	return (x - cMin) * (nMax - nMin) / (cMax - cMin) + nMin;
}

/**
 * Random number in a given range.
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @return {*}  {number}
 * @memberof Functions
 */
export function rng(min: number, max: number): number {
	return (min + Math.random() * (max - min));
}


/**
 * Random Gaussian number
 *
 * @export
 * @param {number} standDev
 * @param {number} mean
 * @return {*}  {number}
 * @memberof Functions
 */
export function randomGaussian(standDev: number, mean: number): number {
	function randn_bm(): number {
		let u = 0, v = 0;
		while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
		while (v === 0) v = Math.random();
		let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
		num = num / 10.0 + 0.5; // Translate to 0 -> 1
		if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
		return num
	}

	return ((randn_bm() * standDev) + mean);
}

/**
 * Random colour
 *
 * @export
 * @param {colour} cCol
 * @return {*}  {colour}
 * @memberof Functions
 */
export function randomCol(cCol: colour): colour {
	let r:number, g:number, b:number;
	r = Math.round(constrain(Math.random() * cCol.r, 0, 255));
	g = Math.round(constrain(Math.random() * cCol.g, 0, 255));
	b = Math.round(constrain(Math.random() * cCol.b, 0, 255));

	return {r:r,g:g,b:b,a:255};
}

/**
 * Constrain a given value to a min and max.
 *
 * @export
 * @param {number} v
 * @param {number} min
 * @param {number} max
 * @return {*}  
 * @memberof Functions
 */
export function constrain(v: number, min: number, max:number) {
	return Math.min(Math.max(v, min), max);
}

export function percentDifference(val1: number, val2: number) {
	if (val1 > 0) {
		return (Math.abs(val1 - val2) / val1);
	} else {
		return val2;
	}
}

export function lerp(amount: number, left: number, right: number): number {
	return ((1 - amount) * left + amount * right);
}

export function PerlinNoise(pos:position, smoothness: number, rep: number) {
	let total: number = 0;

	for (var i = 0; i <= (rep - 1); i++) {
		let freq = Math.pow(2, i);
		let amp = Math.pow(smoothness, i);
		total += noise({x: (pos.x * freq) * amp, y: (pos.y * freq) * amp});
	}

	return total;
}

//for Perlin noise
function noise(pos:position): number {
	//Seeding Perlin noise
	let p: Array<number> = [];
	let permutation: Array<number> = [
		151, 160, 137, 91, 90, 15,
		131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
		190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
		88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
		77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
		102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
		135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
		5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
		223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
		129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
		251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
		49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
		138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
	];

	for (var i = 0; i < 256; i++) p[256 + i] = p[i] = permutation[i];

	let xi: number = Math.floor(pos.x) & 255;
	let yi = Math.floor(pos.y) & 255;
	let g1 = p[p[xi] + yi];
	let g2 = p[p[xi + 1] + yi];
	let g3 = p[p[xi] + yi + 1];
	let g4 = p[p[xi + 1] + yi + 1];

	let xf = pos.x - Math.floor(pos.x);
	let yf = pos.y - Math.floor(pos.y);

	let d1 = grad(g1, xf, yf);
	let d2 = grad(g2, xf - 1, yf);
	let d3 = grad(g3, xf, yf - 1);
	let d4 = grad(g4, xf - 1, yf - 1);

	let u = fade(xf);
	let v = fade(yf);

	let x1Inter = lerp(u, d1, d2);
	let x2Inter = lerp(u, d3, d4);

	return lerp(v, x1Inter, x2Inter);

	//for Perlin noise
	function grad(hash: number, x: number, y: number) {
		switch (hash & 3) {
			case 0: return x + y;
			case 1: return -x + y;
			case 2: return x - y;
			case 3: return -x - y;
			default: return 0;
		}
	}

	//for Perlin noise
	function fade(t: number): number {
		return t * t * t * (t * (t * 6 - 15) + 10);
	}

}

