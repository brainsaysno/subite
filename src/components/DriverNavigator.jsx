import React, { useEffect } from "react";
import PreferencesNavigator from "../screens/PreferencesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-eva-icons";
import DefaultScreen from "../screens/DefaultScreen.jsx";
import CreateTripScreen from "../screens/CreateTripScreen";
import CreateTripNavigator from "./stacks/CreateTripStack";
import ActiveTripsScreen from "../screens/ActiveTripsScreen";
import ActiveTripsNavigator from "./stacks/ActiveTripsNavigator";
import { useTheme } from "react-native-paper";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

function DriverNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Crear viaje"
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: colors.dbackground,
          borderTopWidth: 0,
        },
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          const color = focused ? colors.primary : "white";

          if (route.name === "Viajes") {
            iconName = "navigation-2-outline";
          } else if (route.name === "Crear viaje") {
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
      <Tab.Screen name="Viajes" component={ActiveTripsNavigator} />
      <Tab.Screen name="Crear viaje" component={CreateTripNavigator} />
      <Tab.Screen name="Ajustes" component={PreferencesNavigator} />
    </Tab.Navigator>
  );
}
export default DriverNavigator;
