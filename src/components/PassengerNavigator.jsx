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
			<Tab.Screen name="Recent Trips" component={RecentTripsScreen} />
			<Tab.Screen name="Join Trip" component={JoinTripNavigator} />
			<Tab.Screen name="Profile" component={ProfileNavigator} />
		</Tab.Navigator>
	);
}
export default PassengerNavigator;
