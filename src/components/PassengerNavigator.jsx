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
import RecentTripsScreen from "../screens/RecentTripsScreen.jsx";

const Tab = createBottomTabNavigator();

function PassengerNavigator() {
	return (
		<Tab.Navigator
			initialRouteName="Join Trip"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Recent Trips") {
						iconName = focused ? "clock-outline" : "clock-outline";
					} else if (route.name === "Join Trip") {
						iconName = focused ? "map" : "map";
					} else if (route.name === "Profile") {
						iconName = focused ? "settings-2-outline" : "settings-2-outline";
					}

					return (
						// ICONS FROM EVA DESIGN: https://akveo.github.io/eva-icons/#/
						<Icon name={iconName} width={size} height={size} fill={color} />
					);
				},
			})}
		>
			{/* Viajes recientes */}
			<Tab.Screen name="Recent Trips" component={RecentTripsScreen} />
			{/* Nuevo viaje */}
			<Tab.Screen name="Join Trip" component={JoinTripNavigator} />
			{/* Ajustes */}
			<Tab.Screen name="Profile" component={ProfileNavigator} />
		</Tab.Navigator>
	);
}
export default PassengerNavigator;
