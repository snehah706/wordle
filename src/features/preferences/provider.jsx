import PreferencesContext from './context';
import useThemeMode from './theme';

export default function PreferencesProvider({children}) {
	const [themeMode, toggleThemeMode] = useThemeMode();

	return (
		<PreferencesContext.Provider value={{
			themeMode, toggleThemeMode,
		}}>
			{children}
		</PreferencesContext.Provider>
	);
}