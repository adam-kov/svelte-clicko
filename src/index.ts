/** With specified extra nodes, the event will only fire
 * if the click was outside all of the nodes. */
export const clickOutside = (node: HTMLElement, extraNodes?: HTMLElement[]): { destroy(): void } => {
	const handleClick = (event: MouseEvent) => {
		let outsideExtraNodes = true;

		if (extraNodes?.length) {
			extraNodes.map(extNode => {
				if (extNode && extNode?.contains(event.target as Node)) {
					outsideExtraNodes = false;
				}
			});
		}
		if (!outsideExtraNodes) return;

		if (!node?.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		},
	};
};
