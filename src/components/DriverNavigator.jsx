import React, { useEffect } from "react";
import ProfileNavigator from "../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-eva-icons";
import DefaultScreen from "../screens/DefaultScreen.jsx";
import CreateTripScreen from "../screens/CreateTripScreen";
import CreateTripNavigator from "./stacks/CreateTripStack";
import ActiveTripsScreen from "../screens/ActiveTripsScreen";
import ActiveTripsNavigator from "./stacks/ActiveTripsNavigator";

const Tab = createBottomTabNavigator();

function DriverNavigator() {
	return (
		<Tab.Navigator
			initialRouteName="Create Trip"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Trips") {
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
			<Tab.Screen name="Trips" component={ActiveTripsNavigator} />
			<Tab.Screen name="Create Trip" component={CreateTripNavigator} />
			<Tab.Screen name="Profile" component={ProfileNavigator} />
		</Tab.Navigator>
	);
}
export default DriverNavigator;
