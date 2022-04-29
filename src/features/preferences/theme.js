import {useCallback} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

import useLocalStorage from 'utils/localStorage';

import {LIGHT_THEME, DARK_THEME, THEME_MODE_KEY} from './constants';

export default function useThemeMode() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const [themeMode, setThemeMode] = useLocalStorage(THEME_MODE_KEY, getThemeMode(prefersDarkMode));

	const toggleThemeMode = useCallback(() => setThemeMode((value) => getThemeMode(value === LIGHT_THEME)), [setThemeMode]);

	return [themeMode, toggleThemeMode];
}

function getThemeMode(prefersDarkMode) {
	return prefersDarkMode ? DARK_THEME : LIGHT_THEME;
}
