const codeA = "A".charCodeAt(0);

export function maskCharacter(value) {
	return 1 << (value.charCodeAt(0) - codeA);
}

export function maskString(value) {
	return Array.from(value, maskCharacter).reduce((x, y) => x | y);
}
