import { useFonts } from "expo-font";
import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import StackNavigator from './src/navigation/stack/StackNavigator';
import { AuthProvider } from "./src/contexts/AuthContext";
import { AppModalProvider } from "./src/contexts/AppModalContext";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#0F241F",
  },
};


export default function App() {
  return (
    <AppModalProvider>
      <AuthProvider>
        <NavigationContainer theme={MyTheme}>
          <StackNavigator />
        </NavigationContainer>
      </AuthProvider>
    </AppModalProvider>
  );
}
