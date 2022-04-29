import {useCallback} from 'react';

import useLocalStorage from 'utils/localStorage';

import {GAME_COUNT_KEY, WINS_CHART_KEY} from './constants';
import StatsContext from './context';

export default function StatsProvider({children}) {
	const [games, setGames] = useLocalStorage(GAME_COUNT_KEY, 0);
	const [wins, setWins] = useLocalStorage(WINS_CHART_KEY, {});

	const newGameCreated = useCallback(() => setGames((value) => value + 1), [setGames]);
	const gameWon = useCallback((numGuesses) => setWins((value) => {
		value = {...value};
		value[numGuesses] = 1 + (value[numGuesses] || 0);
		return value;
	}), [setWins])

	return (
		<StatsContext.Provider value={{
			games, newGameCreated,
			wins, gameWon,
		}}>
			{children}
		</StatsContext.Provider>
	);
}
