import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticatedUserContext } from '../providers';
import { Home } from '../Screen';

const Stack = createStackNavigator();
export const AppStack = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
);
};
