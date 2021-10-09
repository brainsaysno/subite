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
import RecentTripsScreen from "../screens/RecentTripsScreen.jsx";

const Tab = createBottomTabNavigator();

function PassengerNavigator() {
	return (
		<Tab.Navigator
			initialRouteName="Nuevo Viaje"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Viajes Recientes") {
						iconName = focused ? "clock-outline" : "clock-outline";
					} else if (route.name === "Nuevo Viaje") {
						iconName = focused ? "map" : "map";
					} else if (route.name === "Ajustes") {
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
			<Tab.Screen name="Viajes Recientes" component={RecentTripsScreen} />
			{/* Nuevo viaje */}
			<Tab.Screen name="Nuevo Viaje" component={JoinTripNavigator} />
			{/* Ajustes */}
			<Tab.Screen name="Ajustes" component={PreferencesNavigator} />
		</Tab.Navigator>
	);
}
export default PassengerNavigator;
