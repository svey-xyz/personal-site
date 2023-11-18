export class HexRenderer {
	RESIZE_INTERVAL: number = 80 as const
	RADIUS: number = 80 as const
	RATE: number = 0.98 as const
	radius: number = this.RADIUS
	resize_interval: number = this.RESIZE_INTERVAL
	rate: number = this.RATE
	vertices: Array<{ x: number; y: number; }> = []
	window: typeof window
	container: HTMLElement
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D | null = null
	hexagons: Array<HEXAGON> = [];
	resizeIds: Array<any> = [];
	width: number = 0
	height: number = 0
	hexWidth: number = 0
	hexHeight: number = 0
	tmpWidth: number = 0
	tmpHeight: number = 0

	constructor(container: HTMLElement) {
		this.window = window
		this.container = container
		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'absolute'
		this.canvas.style.top = '0'
		this.canvas.style.bottom = '0'
		this.canvas.style.zIndex = '-1'

		this.container.append(this.canvas)
	}

	init() {
		this.setup();
		this.reconstructMethods();
		this.bindEvent();
		this.render();
	}

	setup() {
		this.hexagons.length = 0;
		this.resizeIds.length = 0;

		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.canvas.width = this.width
		this.canvas.height = this.height

		this.context = this.canvas.getContext('2d')

		this.createHexagons();
	}
	createHexagons() {
		this.radius = this.RADIUS * this.RATE;
		this.vertices = [];

		for (var i = 0; i < 6; i++) {
			this.vertices.push({ x: this.radius * Math.sin(Math.PI / 3 * i), y: -this.radius * Math.cos(Math.PI / 3 * i) });
		}
		this.vertices.push(this.vertices[0]);
		this.hexWidth = this.RADIUS * Math.cos(Math.PI / 6) * 2;
		this.hexHeight = this.RADIUS * (2 - Math.sin(Math.PI / 6));

		var countX = Math.ceil(this.width / this.hexWidth) + 1,
			countY = Math.ceil(this.height / this.hexHeight) + 1,
			offsetX = -(countX * this.hexWidth - this.width) / 2,
			offsetY = -(countY * this.hexHeight - this.height) / 2;

		countX++;

		for (var y = 0; y < countY; y++) {
			for (var x = 0; x < countX; x++) {
				this.hexagons.push(
					new HEXAGON(
						this, offsetX + (x + 0.5) * this.hexWidth - (y % 2 == 1 ? 0 : this.hexWidth / 2),
						offsetY + (y + 0.5) * this.hexHeight
					)
				);
			}
		}
		for (var y = 0; y < countY; y++) {
			for (var x = 0; x < countX; x++) {
				var hexagon = this.hexagons[y * countX + x];

				if (x < countX - 1) {
					hexagon.neighbors[0] = this.hexagons[y * countX + x + 1];
				}
				if ((x < countX - 1 || y % 2 == 0) && y < countY - 1) {
					hexagon.neighbors[1] = this.hexagons[(y + 1) * countX + x + (y % 2 == 1 ? 1 : 0)];
				}
				if ((x > 0 || y % 2 == 1) && y < countY - 1) {
					hexagon.neighbors[2] = this.hexagons[(y + 1) * countX + x + (y % 2 == 1 ? 0 : -1)];
				}
				if (x > 0) {
					hexagon.neighbors[3] = this.hexagons[y * countX + x - 1];
				}
				if ((x > 0 || y % 2 == 1) && y > 0) {
					hexagon.neighbors[4] = this.hexagons[(y - 1) * countX + x + (y % 2 == 1 ? 0 : -1)];
				}
				if ((x < countX - 1 || y % 2 == 0) && y > 0) {
					hexagon.neighbors[5] = this.hexagons[(y - 1) * countX + x + (y % 2 == 1 ? 1 : 0)];
				}
			}
		}
		this.hexagons[this.getRandomValue(0, this.hexagons.length - 1)].select();
	}

	getRandomValue(min: number, max: number) {
		return min + (max - min) * Math.random() | 0;
	}

	watchWindowSize() {
		while (this.resizeIds.length > 0) {
			clearTimeout(this.resizeIds.pop());
		}
		this.tmpWidth = this.window.innerWidth;
		this.tmpHeight = this.window.innerHeight;
		this.resizeIds.push(setTimeout(this.judgeToStopResize, this.RESIZE_INTERVAL));
	}

	judgeToStopResize() {
		var width = this.window.innerWidth,
			height = this.window.innerHeight,
			stopped = (width == this.tmpWidth && height == this.tmpHeight);

		this.tmpWidth = width;
		this.tmpHeight = height;

		if (stopped) {
			this.setup();
		}
	}

	reconstructMethods() {
		this.selectHexagon = this.selectHexagon.bind(this);
		this.watchWindowSize = this.watchWindowSize.bind(this);
		this.judgeToStopResize = this.judgeToStopResize.bind(this);
		this.render = this.render.bind(this);
	}

	selectHexagon(event: MouseEvent) {
		var axis = this.getAxis(event);

		for (var i = 0, count = this.hexagons.length; i < count; i++) {
			this.hexagons[i].judge(axis.x, axis.y);
		}
	}

	getAxis(event: MouseEvent) {
		return {
			x: event.clientX - this.container.offsetLeft + this.window.scrollX,
			y: event.clientY - this.container.offsetTop + this.window.scrollY
		};
	}

	bindEvent() {
		this.window.addEventListener('resize', this.watchWindowSize);
		this.container.addEventListener('click', this.selectHexagon);
	}

	render() {
		requestAnimationFrame(this.render);

		if (!this.context) return

		this.context.fillStyle = 'hsla(0, 0%, 6%, 0.3)';
		this
		this.context.fillRect(0, 0, this.width, this.height);
		

		for (var i = 0, count = this.hexagons.length; i < count; i++) {
			this.hexagons[i].render(this.context);
		}
	}
}

class HEXAGON {
	COUNT = { MIN: 5, MAX: 50 }
	LUMINANCE: number = Math.random()
	renderer: HexRenderer
	x: number
	y: number
	selections: Array<{ count: number; hue: number; }> = []
	neighbors = new Array(6);
	sourceIndices: Array<{ indices: Array<number>, hue: number, count: number }> = [];
	hue: number = 0
	backgroundColour: string

	constructor(renderer: HexRenderer, x: number, y: number) {
		this.backgroundColour = getComputedStyle(renderer.container).getPropertyValue('--primary-bg');

		this.renderer = renderer;
		this.x = x;
		this.y = y;
	}

	judge(x: number, y: number) {
		if (x < this.x - this.renderer.hexWidth / 2 || x > this.x + this.renderer.hexWidth / 2
			|| y < this.y - this.renderer.RADIUS || y > this.y + this.renderer.RADIUS
			|| y < this.y && Math.abs((x - this.x) / (y - this.y + this.renderer.RADIUS)) > Math.tan(Math.PI / 3)
			|| y > this.y && Math.abs((x - this.x) / (y - this.y - this.renderer.RADIUS)) > Math.tan(Math.PI / 3)) {
			return;
		}
		this.select();
	}

	select() {
		this.hue = this.renderer.getRandomValue(100, 300);
		this.selections.push({ count: 0, hue: this.hue });
	}
	relate(sourceIndices: { indices: Array<number>, hue: number, count: number }) {
		this.sourceIndices.push(sourceIndices);
	}

	render(context: CanvasRenderingContext2D) {
		context.save();
		// context.globalCompositeOperation = 'lighter';
		context.translate(this.x, this.y);
		context.beginPath();

		for (var i = 0, vertices = this.renderer.vertices; i < 6; i++) {
			context[i == 0 ? 'moveTo' : 'lineTo'](vertices[i].x, vertices[i].y);
		}
		context.closePath();
		context.fillStyle = this.backgroundColour
		context.fill();

		context.restore();

		for (var i = this.selections.length - 1; i >= 0; i--) {
			var selection = this.selections[i];

			if (selection.count == this.COUNT.MIN) {
				for (var j = 0; j < 6; j++) {
					if (this.neighbors[j]) {
						var indices: Array<number> = [];

						for (var k = 0; k < 3; k++) {
							var index = j - 1 + k;
							index += 6;
							index %= 6;
							indices.push(index);
						}
						this.neighbors[j].relate({ indices: indices, hue: this.hue, count: 0 });
					}
				}
			}
			if (++selection.count == this.COUNT.MAX * 2) {
				this.selections.splice(i, 1);
			}
		}
		for (var i = this.sourceIndices.length - 1; i >= 0; i--) {
			const indices = this.sourceIndices[i],
				index = indices.indices[this.renderer.getRandomValue(0, 3)];

			if (this.neighbors[index] && indices.count == this.COUNT.MIN) {
				this.neighbors[index].relate({ indices: indices.indices, hue: indices.hue, count: 0 });
			}
			if (++indices.count == this.COUNT.MAX * 2) {
				this.sourceIndices.splice(i, 1);
			}
		}
	}
}