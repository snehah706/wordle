import {createContext, useContext} from 'react';

const GameConfigContext = createContext();

export const useGameConfig = () => useContext(GameConfigContext);

export default GameConfigContext;
