import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login,SignUp,ResetPassword} from '../Screen';
const Stack = createStackNavigator();
export const AuthStack = () => {
    return (
        <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={SignUp} />
            <Stack.Screen name='ForgotPassword' component={ResetPassword} />
        </Stack.Navigator>
);
    }
