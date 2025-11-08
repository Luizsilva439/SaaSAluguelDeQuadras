import { useFonts } from "expo-font";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/stack/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}
