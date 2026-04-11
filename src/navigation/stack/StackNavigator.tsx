import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '../../screens/auth';
import SignUp from '../../screens/signUp'
import Splash from '../../screens/splash';
import TabNavigator from '../tab/TabNavigator';

export type RootStackParamList = {
  Auth: undefined;
  SignUp: undefined;
  Splash: undefined;
  TabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="Auth"
        component={Auth} />

      <Stack.Screen
        name="SignUp"
        component={SignUp} />

      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator} />

      <Stack.Screen
        name="Splash"
        component={Splash} />

    </Stack.Navigator>
  );
}
