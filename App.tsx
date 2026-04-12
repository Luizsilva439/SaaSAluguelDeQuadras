import { useFonts } from "expo-font";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/stack/StackNavigator';
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </AuthProvider>
  );
}
