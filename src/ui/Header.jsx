import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';

import {usePreferences} from 'features';

export default function Header() {
	const {toggleThemeMode} = usePreferences();

	return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1 }}>
                    WORDLE
                </Typography>
                <IconButton size="large" onClick={toggleThemeMode} color="inherit" edge="end">
                    <BrightnessMediumIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
