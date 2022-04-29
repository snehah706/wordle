import * as React from 'react';

import {PreferencesProvider, GameConfigProvider, StatsProvider, GameStateProvider} from 'features';
import {Home, ThemedApp} from 'ui';

function App() {
    return (
        <PreferencesProvider>
            <GameConfigProvider>
                <StatsProvider>
                    <GameStateProvider>
                        <ThemedApp>
                            <Home />
                        </ThemedApp>
                    </GameStateProvider>
                </StatsProvider>
            </GameConfigProvider>
        </PreferencesProvider>
    );
}

export default App;
