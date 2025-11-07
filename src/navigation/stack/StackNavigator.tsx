import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '../../screens/auth';
import SignUp from '../../screens/signUp'

export type RootStackParamList = {
  Auth: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="Auth"
        component={Auth} />

      <Stack.Screen
        name="SignUp"
        component={SignUp} />

    </Stack.Navigator>
  );
}
