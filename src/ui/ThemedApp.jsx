import {useMemo} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {usePreferences} from 'features';

export default function ThemedApp({children}) {
	const {themeMode} = usePreferences();

	const theme = useMemo(() => createTheme({palette: {mode: themeMode}}), [themeMode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
	 		{children}
		</ThemeProvider>
	);
}
