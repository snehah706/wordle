import {useGameState, GamePlayState} from 'features';

import GamePlayScreen from './GamePlayScreen';
import NewGameScreen from './NewGameScreen';
import StatsScreen from './StatsScreen';

export default function Contents() {
    const {gameState} = useGameState();

    if (gameState === GamePlayState.FINISHED) {
        return <StatsScreen />;
    }
    if (gameState === GamePlayState.ONGOING) {
        return <GamePlayScreen />;
    }
    return <NewGameScreen />;
}
