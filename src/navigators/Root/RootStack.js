import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthStack, AppStack } from '..';

const Stack = createStackNavigator();

const RootStack = () => (
    <Stack.Navigator
        initialRouteName="App"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
)

export default RootStack;