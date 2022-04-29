import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import {useGameState} from 'features';

export default function NewGameScreen({label = "New Game"}) {
	const {createGame} = useGameState();
	return (
		<Grid container item xs={true} alignItems="center" justifyContent="center">
			<Button variant="contained" onClick={createGame}>
				{label}
			</Button>
		</Grid>
	);
}