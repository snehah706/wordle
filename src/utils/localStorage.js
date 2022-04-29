import {useState} from 'react';

export default function useLocalStorage(key, initial) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			var value = window.localStorage.getItem(key);
			return value ? JSON.parse(value) : initial;
		} catch (error) {
			console.log(error);
			return initial;
		}
	});

	const setValue = (valueOrFn) => {
		const value = valueOrFn instanceof Function ? valueOrFn(storedValue) : valueOrFn;
		setStoredValue(value);
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.log(error);
		}
	}

	return [storedValue, setValue];
}
