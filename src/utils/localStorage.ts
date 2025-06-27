
export function getLocalStorage<T>(key: string): T | null {
	try {
		const item = localStorage.getItem(key);
		if (!item) return null;
		return JSON.parse(item) as T;
	} catch (error) {
		console.error("Error leyendo localStorage:", error);
		return null;
	}
}

export function setLocalStorage<T>(key: string, data: T): void {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		console.error("Error guardando en localStorage:", error);
	}
}




