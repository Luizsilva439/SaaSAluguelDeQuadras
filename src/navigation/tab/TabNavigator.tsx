import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/home";
import Profile from "../../screens/profile";
import MyReservas from "../../screens/MyReservas";
import Favoritos from "../../screens/favoritos";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#9fb5ad",
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginBottom: 3,
        },
        tabBarStyle: {
          backgroundColor: colors.secondary,
          borderTopWidth: 0,
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}
    >

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Reservas"
        component={MyReservas}
        options={{
          tabBarLabel: "Reservas",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

       <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
