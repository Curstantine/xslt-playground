export function loadStored(key: string, fallback: string): string {
	try {
		const stored = localStorage.getItem(key);
		return stored ?? fallback;
	} catch {
		return fallback;
	}
}

export function storeValue(key: string, value: string) {
	try {
		localStorage.setItem(key, value);
	} catch {
		// storage full or unavailable — silently ignore
	}
}
