export class base {
	private _container: HTMLElement
	private _parentContainer: HTMLElement

	constructor(container: HTMLElement, args?: {}) {
		this._container = container
		this._parentContainer = this.container.parentElement ? this.container.parentElement : this.container;

		this.container.classList.add('loaded');
	}

	
	public get container(): HTMLElement {
		return this._container
	}

	public get parentContainer(): HTMLElement {
		return this._parentContainer
	}
}