import { useFonts } from "expo-font";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/stack/StackNavigator';
import { AuthProvider } from "./src/contexts/AuthContext";
import { AppModalProvider } from "./src/contexts/AppModalContext";

export default function App() {
  return (
    <AppModalProvider>
      <AuthProvider>
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      </AuthProvider>
    </AppModalProvider>
  );
}
