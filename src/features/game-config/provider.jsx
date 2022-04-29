import {useCallback} from 'react';

import useLocalStorage from 'utils/localStorage';

import {WORDS, DEFAULT_WORD_LEN, DEFAULT_MAX_GUESSES, MAX_GUESSES_LIMIT, MAX_GUESSES_KEY, WORD_LEN_KEY} from './constants';
import GameConfigContext from './context';

export default function GameConfigProvider({children}) {
	const [wordLen, storeWordLen] = useLocalStorage(WORD_LEN_KEY, DEFAULT_WORD_LEN);
	const [maxGuesses, storeMaxGuesses] = useLocalStorage(MAX_GUESSES_KEY, DEFAULT_MAX_GUESSES);

	const setMaxGuesses = useCallback((maxGuesses) => {
		if (MAX_GUESSES_LIMIT[0] <= maxGuesses && maxGuesses <= MAX_GUESSES_LIMIT[1]) {
			storeMaxGuesses(maxGuesses);
		}
	}, [storeMaxGuesses]);

	const setWordLen = useCallback((wordLen) => {
		if (WORDS[wordLen] && WORDS[wordLen].size > 0) {
			storeWordLen(wordLen);
		}
	}, [storeWordLen]);

	return (
		<GameConfigContext.Provider value={{
			wordLen, setWordLen,
			maxGuesses, setMaxGuesses,
			words: WORDS[wordLen],
		}}>
			{children}
		</GameConfigContext.Provider>
	);
}
