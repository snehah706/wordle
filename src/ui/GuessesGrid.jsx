import {useMemo} from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import {Hint} from 'features'

export default function GuessesGrid({current, previous, total, width, highlight}) {
	const [blanks, blankColors, errorColors] = useMemo(() => ([
			[...BLANK_CHAR.repeat(width)],
			Array(width).fill('primary'),
			Array(width).fill('error'),
		]), [width]);

	return (
		<Grid container item direction="column" wrap="nowrap" xs="auto" spacing={2}>
			{previous.map(({word, match}, index) => (
				<GuessRow key={word}
					characters={[...word]}
					colors={match.map((hint) => hintColor[hint])}
					highlight={highlight === index}
				/>
			))}
			<GuessRow key="current-guess"
				characters={[...current, ...BLANK_CHAR.repeat(width - current.length)]}
				colors={highlight === previous.length ? errorColors : blankColors}
				highlight={highlight === previous.length}
			/>
			{Array(Math.max(0, total - previous.length - 1)).fill(null).map((_, index) => (
				<GuessRow key={index} characters={blanks} colors={blankColors} />
			))}
		</Grid>
	);
}

function GuessRow({characters, colors, highlight=false, ...rest}) {
	return (
		<Grid container item direction="row" wrap="nowrap" spacing={1} {...rest}>
			{characters.map((character, index) => (
				<Grid key={index} item>
					<Cell character={character} color={colors[index]} highlight={highlight} />
				</Grid>
			))}
		</Grid>
	);
}

function Cell({character, color, highlight=false}) {
	return (
		<Button variant={highlight ? "contained" : "outlined"} color={color}>
			{character}
		</Button>
	);
}

const hintColor = {
	[Hint.CORRECT]: 'success',
	[Hint.MISPLACED]: 'warning',
	[Hint.INCORRECT]: 'error',
}

const BLANK_CHAR = "\xa0";