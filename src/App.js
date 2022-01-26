import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import { RootStack } from './navigators';
import { theme } from './constants';

const App = () => {
    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                <RootStack />
            </NativeBaseProvider>
        </NavigationContainer>
    );
}

export default App;