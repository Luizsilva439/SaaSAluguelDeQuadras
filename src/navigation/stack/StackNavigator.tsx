import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '../../screens/auth';
import SignUp from '../../screens/signUp'
import Splash from '../../screens/splash';
import TabNavigator from '../tab/TabNavigator';
import PublishQuadra from '../../screens/publishQuadra';
import QuadraDetails from '../../screens/quadraDetails';
import MyCourts from '../../screens/MyCourts';
import QuadraReservas from "../../screens/QuadraReservas";
import MyReservas from "../../screens/MyReservas";

export type RootStackParamList = {
  Auth: undefined;
  SignUp: undefined;
  Splash: undefined;
  TabNavigator: undefined;
  PublishQuadra: undefined;
  QuadraDetails: { quadraId: string };
  MyCourts: undefined;
  QuadraReservas: { quadraId: string };
  MyReservas: undefined;
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

      <Stack.Screen
        name="PublishQuadra"
        component={PublishQuadra} />

      <Stack.Screen
        name="QuadraDetails"
        component={QuadraDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MyCourts"
        component={MyCourts}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="QuadraReservas"
        component={QuadraReservas}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MyReservas"
        component={MyReservas}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
