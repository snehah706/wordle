import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {useGameState} from 'features';
import NewGameScreen from './NewGameScreen';

export default function StatsScreen() {
	const {win, answer} = useGameState();

	return [
		<Grid container item direction="column" sx={{padding: 4}} alignItems="center" justifyContent="center">
			<Grid item xs="auto">
				<Typography variant="h4">
					{win
					 ? `Congratulations! ${answer} is the correct answer`
					 : `The word was ${answer}. Better luck next time`
					}
				</Typography>
			</Grid>
		</Grid>,
		<NewGameScreen label="Play again" />
	];
}
