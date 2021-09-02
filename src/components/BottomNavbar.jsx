import * as React from "react";
import { Text, useTheme } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import styles from "../styles.js";
import CreateTripScreen from "../screens/CreateTripScreen";
import ProfileNavigator from "../screens/ProfileScreen";
import CreateTripNavigation from "../screens/CreateTripStack.jsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-eva-icons";

const TestRoute = () => {
  return (
    <View style={styles.container}>
      <Text>Test Route</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

function BottomNavbar({ darkModeToggle }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Recent Trips") {
            iconName = focused ? "star" : "star";
          } else if (route.name === "Create Trip") {
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
      <Tab.Screen name="Recent Trips" component={TestRoute} />
      <Tab.Screen name="Create Trip" component={CreateTripNavigation} />
      <Tab.Screen name="Profile">
        {() => <ProfileNavigator darkModeToggle={darkModeToggle} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
export default BottomNavbar;
