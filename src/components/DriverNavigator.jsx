import React, { useEffect } from "react";
import ProfileNavigator from "../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-eva-icons";
import DefaultScreen from "../screens/DefaultScreen.jsx";
import CreateTripScreen from "../screens/CreateTripScreen";
import CreateTripNavigator from "./stacks/CreateTripStack";

const Tab = createBottomTabNavigator();

function DriverNavigator({ darkModeToggle, isDriver }) {
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
      <Tab.Screen name="Recent Trips">
        {(navProps) => <DefaultScreen isDriver={isDriver} {...navProps} />}
      </Tab.Screen>
      <Tab.Screen name="Create Trip" component={CreateTripNavigator} />
      <Tab.Screen name="Profile">
        {() => <ProfileNavigator darkModeToggle={darkModeToggle} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
export default DriverNavigator;
