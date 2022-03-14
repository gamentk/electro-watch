import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { LogBox } from 'react-native';

import { RootStack } from './navigators';
import { theme } from './constants';

const App = () => {
    LogBox.ignoreLogs(['new NativeEventEmitter', 'react-native-gesture-handler']);

    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                <RootStack />
            </NativeBaseProvider>
        </NavigationContainer>
    );
}

export default App;