import {useCallback, useState} from 'react';

import Grid from '@mui/material/Grid';

import {useGameConfig, useGameState, GuessResult} from 'features';

import GuessesGrid from './GuessesGrid';
import KeyboardView from './KeyboardView';

export default function GamePlayScreen() {
	const [guess, setGuess] = useState('');
	const [highlightGuess, setHighlightGuess] = useState(-1);
	const {wordLen, maxGuesses} = useGameConfig();
	const {guess: guessWord, guesses, validKeys, invalidKeys} = useGameState();

	const addChar = useCallback((ch) => setGuess((value) => {
		if (value.length === wordLen) {
			return value;
		}
		return value + ch;
	}), [wordLen]);

	const deleteChar = useCallback(() => setGuess((value) => {
		if (value.length === 0) {
			return value;
		}
		return value.substring(0, value.length - 1);
	}), []);

	const highlight = useCallback((index) => {
		setHighlightGuess(index);
		setTimeout(() => setHighlightGuess((value) => value === index ? null : value), 1000);
	}, [])

	const submitGuess = useCallback(() => {
		if (guess.length === wordLen) {
			const res = guessWord(guess);
			const {result} = res;
			if (result === GuessResult.VALID) {
				setGuess('');
			} else if (result === GuessResult.DUPLICATE) {
				highlight(res.index);
			} else if (result === GuessResult.INVALID) {
				highlight(guesses.length);
			}
		}
	}, [guessWord, guess, guesses, highlight, wordLen]);

	return [
		<Grid key="guess" container item xs={true} sx={{padding: 2}} alignItems="center" justifyContent="center">
			<GuessesGrid current={guess} previous={guesses} total={maxGuesses} width={wordLen} highlight={highlightGuess} />
		</Grid>,
		<Grid key="keyboard" item xs="auto" sx={{padding: 2}}>
			<KeyboardView onAddChar={addChar} onDeleteChar={deleteChar} onSubmit={submitGuess} validKeys={validKeys} invalidKeys={invalidKeys} />
		</Grid>
	];
}
