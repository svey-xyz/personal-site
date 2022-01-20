export const relativeLocation = function (obj: HTMLElement, ev: MouseEvent): {x: number, y: number} {
	return getEventLocation(obj, ev);
}

/**
 * Return the location of the element (x,y) being relative to the document.
 * 
 * @param {Element} obj Element to be located
 */
function getElementPosition(obj: any) {
	var curleft = 0, curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return { x: curleft, y: curtop };
	}
	return undefined;
}

/** 
 * return the location of the click (or another mouse event) relative to the given element (to increase accuracy).
 * @param {DOM Object} element A dom element (button,canvas,input etc)
 * @param {DOM Event} event An event generate by an event listener.
 */
function getEventLocation(element: HTMLElement, event: MouseEvent): {x: number, y: number} {
	// Relies on the getElementPosition function.
	var pos = getElementPosition(element)!;

	return {
		x: (event.pageX - pos.x),
		y: (event.pageY - pos.y)
	};
}