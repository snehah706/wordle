import Grid from '@mui/material/Grid';
import Header from './Header';
import Contents from './Contents';

export default function Home() {
	return (
	    <Grid container direction="column" alignItems="center">
	        <Header />
	        <Contents />
    	</Grid>
	);
}
