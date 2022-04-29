import {createContext, useContext} from 'react';

const StatsContext = createContext();

export const useStats = () => useContext(StatsContext);

export default StatsContext;
