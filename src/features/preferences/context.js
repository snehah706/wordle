import {createContext, useContext} from 'react';

const PreferencesContext = createContext();

export const usePreferences = () => useContext(PreferencesContext);

export default PreferencesContext;
