import React, { Fragment } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Text, Icon } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo';

import { Monitor, Alarm, AlarmInfo, History } from '../../screens';

const Stack = createStackNavigator();

const AppStack = () => (
    <Fragment>
        <Stack.Navigator
            initialRouteName="Monitor"
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureEnabled: true,
                headerBackImage: () => (
                    <Icon
                        as={EntypoIcon}
                        name="chevron-thin-left"
                        size={6}
                    />
                ),
                headerTitle: ({ children }) => (
                    <Text
                        fontFamily="body"
                        fontSize="xl"
                        fontWeight="semibold"
                    >
                        {children}
                    </Text>
                ),
                headerStyle: {
                    borderBottomWidth: 1,
                    borderColor: 'gray'
                }
            }}
        >
            <Stack.Screen
                name="Electric Parameters"
                component={Monitor}
            />
            <Stack.Screen
                name="Alarm"
                component={Alarm}
            />
            <Stack.Screen
                name="Alarm Information"
                component={AlarmInfo}
            />
            <Stack.Screen
                name="History"
                component={History}
            />
        </Stack.Navigator>
    </Fragment>
)

export default AppStack;