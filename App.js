import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Login,SignUp,ResetPassword,Home} from './Screen'
import { AuthenticatedUserProvider } from './providers';
import { RootNavigator } from './navigation/RootNavigator';
function App() {
  return ( 
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <RootNavigator/>
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
   );
}

export default App;