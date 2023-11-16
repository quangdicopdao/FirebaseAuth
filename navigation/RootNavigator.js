import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { AuthenticatedUserContext } from '../providers';
import { LoadingIndicator } from '../components';

export const RootNavigator = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext);

    useEffect(() => {
        const unsubscribeAuthStateChanged = auth().onAuthStateChanged(
        authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    }
    );
    // unsubscribe auth listener on unmount
        return unsubscribeAuthStateChanged;
    }, [user]);

   
    return (
        <NavigationContainer>
             {user ? <AppStack /> : <AuthStack />}
         </NavigationContainer>
    );
 };
    