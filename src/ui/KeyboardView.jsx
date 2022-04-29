import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import {maskCharacter} from 'utils/bitmask';

export default function KeyboardView({onAddChar, onDeleteChar, onSubmit, validKeys, invalidKeys}) {
	return (
		<Grid container direction="column" wrap="nowrap" spacing={1}>
			<KeyRow key="top">{keys("QWERTYUIOP", onAddChar, validKeys, invalidKeys)}</KeyRow>
			<KeyRow key="middle">
				{keys("ASDFGHJKL", onAddChar, validKeys, invalidKeys)}
				
			</KeyRow>
			<KeyRow key="bottom">
				{keys("ZXCVBNM", onAddChar, validKeys, invalidKeys)}
				<Key key="delete" label="Delete" onClick={onDeleteChar} />
				<Key key="enter" label="Enter" onClick={onSubmit} />
			</KeyRow>
		</Grid>
	);
}

function KeyRow({children, ...rest}) {
	return (
		<Grid container item direction="row" wrap="nowrap" justifyContent="center" spacing={1} {...rest}>
			{children}
		</Grid>
	);
}

function Key({label, color, onClick, ...rest}) {
	return (
		<Grid item {...rest}>
			<Button variant="contained" color={color} onClick={onClick}>{label}</Button>
		</Grid>
	);
}

function keys(string, onClick, validKeys, invalidKeys) {
	return Array.from(string, (character) => {
		const mask = maskCharacter(character);
		const color = getColor(validKeys & mask, invalidKeys & mask);
		return <Key key={character} label={character} color={color} onClick={() => onClick(character)} />;
	});
}

function getColor(valid, invalid) {
	if (valid) return 'success';
	if (invalid) return 'error';
	return 'primary';
}