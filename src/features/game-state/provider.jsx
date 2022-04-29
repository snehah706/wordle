import {useCallback, useMemo, useState} from 'react';

import {useGameConfig} from 'features/game-config';
import {useStats} from 'features/stats';
import {maskString} from 'utils/bitmask';

import {GamePlayState, GuessResult, Hint} from './constants';
import GameStateContext from './context';

export default function GameStateProvider({children}) {
	const {words, maxGuesses} = useGameConfig();
	const {newGameCreated, gameWon} = useStats();
	const [answer, setAnswer] = useState(null);
	const [win, setWin] = useState(null);
	const [gameState, setGameState] = useState(GamePlayState.NOT_STARTED);
	const [guesses, setGuesses] = useState([]);
	const [keys, setKeys] = useState(0);

	const answerMask = useMemo(() => answer === null ? 0 : maskString(answer), [answer]);

	const createGame = useCallback(() => {
		setAnswer(selectNewWord(words));
		newGameCreated();
		setWin(false);
		setGameState(GamePlayState.ONGOING);
		setGuesses([]);
		setKeys(0);
	}, [words, newGameCreated]);

	const guess = useCallback((word) => {
		word = word.toUpperCase();

		if (!words.has(word)) {
			return {result: GuessResult.INVALID};
		}

		const index = guesses.findIndex((guess) => guess.word === word);
		if (index >= 0) {
			return {result: GuessResult.DUPLICATE, index};
		}

		var newGuesses = [...guesses, {word, match: match(answer, word)}];
		setGuesses((value) => newGuesses);
		setKeys((value) => value | maskString(word));
		if (word === answer) {
			setGameState(GamePlayState.FINISHED);
			setWin(true);
			gameWon(newGuesses.length);
		} else if (newGuesses.length === maxGuesses) {
			setGameState(GamePlayState.FINISHED);
			setWin(false);
		}
		return {result: GuessResult.VALID};
	}, [answer, guesses, maxGuesses, words, gameWon]);

	return (
		<GameStateContext.Provider value={{
			answer, gameState, win, guesses, invalidKeys: keys & ~answerMask, validKeys: keys & answerMask, guess, createGame,
		}}>
			{children}
		</GameStateContext.Provider>
	);
}

function selectNewWord(words) {
	return [...words][Math.floor(words.size * Math.random())];
}

function match(expected, actual) {
	expected = [...expected];
	actual = [...actual];
	const counts = new Map();
	expected.forEach((value) => counts.set(value, 1 + (counts.get(value) || 0)));

	var result = actual.map((value, index) => {
		if (value === expected[index]) {
			counts.set(counts.get(value) - 1);
			return Hint.CORRECT;
		}
		return Hint.INCORRECT;
	});

	actual.forEach((value, index) => {
		if (result[index] === Hint.INCORRECT && counts.get(value) > 0) {
			result[index] = Hint.MISPLACED;
			counts.set(value, counts.get(value) - 1);
		}
	});
	return result;
}