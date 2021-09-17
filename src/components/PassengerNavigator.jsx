import * as React from "react";
import { Text, useTheme } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import styles from "../styles.js";
import JoinTripScreen from "../screens/JoinTripScreen";
import ProfileNavigator from "../screens/ProfileScreen";
import JoinTripNavigator from "./stacks/JoinTripStack.jsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-eva-icons";
import DefaultScreen from "../screens/DefaultScreen.jsx";

const Tab = createBottomTabNavigator();

function PassengerNavigator({ darkModeToggle, isDriver }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Recent Trips") {
            iconName = focused ? "star" : "star";
          } else if (route.name === "Join Trip") {
            iconName = focused ? "map" : "map";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person";
          }

          return (
            // ICONS FROM EVA DESIGN: https://akveo.github.io/eva-icons/#/
            <Icon name={iconName} width={size} height={size} fill={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Recent Trips">
        {(navProps) => (
          <DefaultScreen {...navProps} isDriver={isDriver}></DefaultScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Join Trip" component={JoinTripNavigator} />
      <Tab.Screen name="Profile">
        {() => <ProfileNavigator darkModeToggle={darkModeToggle} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
export default PassengerNavigator;
