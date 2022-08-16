module.exports = (data) => {
	// console.log(data)
	let theme = data.defaultTheme
	if (!theme.calculatedColourOverride) {
		const secondaryBackgroundHsl = duplicateColourObject(theme.primaryBackground)
		console.log(theme.primaryBackground)
	}
}

function duplicateColourObject(colourObj) {
	let colMap = new Map();
	colMap.set('hex', colourObj.hex)
	colMap.set('hsl', colourObj.hsl)
	colMap.set('hsv', colourObj.hsv)
	colMap.set('rgb', colourObj.rgb)

	return new colourObject(colMap, colourObj.alpha)
}

class colourObject {
	objConstructors = {
		'hex': hexObject,
		'hsl': hslObject,
		'hsv': hsvObject,
		'rgb': rgbObject
	}
	_type = 'color'
	alpha = 1;
	hex; hsl; hsv; rgb;

	/**
	 * 
	 * @param {Map} args 
	 * Provide at least one colour object
	 * @param {Number} a 
	 * Alpha value
	 * 
	 */
	constructor(args, a = 1) {
		this.alpha = a;

		for (const [key, colObj] of args) {
			if (colObj) this[key] = new this.objConstructors[key];
		}
	}

	darker(amnt) {
		this.l -= amnt
	}

	lighter(amnt) {
		this.l += amnt;
	}
}

class hexObject {
	hex = ''
	constructor(hex) {
		this.hex = hex;
	}
}

class hslObject {
	_type = 'hslaColor'
	alpha = 1;
	h; s; l;

	constructor(h, s, l, a = 1) {
		this.alpha = a;
		this.h = h;
		this.s = s;
		this.l = l;
	}
}

class hsvObject {
	_type = 'hsvaColor'
	alpha = 1;
	h; s; v;

	constructor(h, s, v, a = 1) {
		this.alpha = a;
		this.h = h;
		this.s = s;
		this.v = v;
	}
}

class rgbObject {
	_type = 'rgbaColor'
	alpha = 1;
	r; g; b;

	constructor(r, g, b, a = 1) {
		this.alpha = a;
		this.r = r;
		this.g = g;
		this.b = b;
	}
}

function hslToHex(hsl) {}
function hslToHsv(hsl) {}
function hslToRgb(hsl) {}