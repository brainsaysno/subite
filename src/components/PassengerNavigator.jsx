import * as React from "react";
import { Text, useTheme } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import styles from "../styles.js";
import JoinTripScreen from "../screens/JoinTripScreen";
import PreferencesNavigator from "../screens/PreferencesScreen";
import JoinTripNavigator from "./stacks/JoinTripStack.jsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-eva-icons";
import DefaultScreen from "../screens/DefaultScreen.jsx";
import RecentTripsNavigator from "./stacks/RecentTripsNavigator.jsx";

const Tab = createBottomTabNavigator();

function PassengerNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Nuevo viaje"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarBackground: () => (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.dbackground,
            }}
          />
        ),
        tabBarIcon: ({ size, focused }) => {
          let iconName;
          const color = focused ? colors.blue : "white";

          if (route.name === "Viajes") {
            iconName = "clock-outline";
          } else if (route.name === "Nuevo viaje") {
            iconName = "map";
          } else if (route.name === "Ajustes") {
            iconName = "settings-2-outline";
          }

          return (
            // ICONS FROM EVA DESIGN: https://akveo.github.io/eva-icons/#/
            <Icon name={iconName} width={size} height={size} fill={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Viajes" component={RecentTripsNavigator} />
      <Tab.Screen name="Nuevo viaje" component={JoinTripNavigator} />
      <Tab.Screen name="Ajustes" component={PreferencesNavigator} />
    </Tab.Navigator>
  );
}
export default PassengerNavigator;
