import React, { useEffect } from "react";
import PreferencesNavigator from "../screens/PreferencesScreen";
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
			initialRouteName="Nuevo Viaje"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Viajes activos") {
						iconName = focused
							? "navigation-2-outline"
							: "navigation-2-outline";
					} else if (route.name === "Crear viaje") {
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
			{/* Viajes activos */}
			<Tab.Screen name="Viajes activos" component={ActiveTripsNavigator} />
			{/* Nuevo viaje */}
			<Tab.Screen name="Crear viaje" component={CreateTripNavigator} />
			{/* Ajustes */}
			<Tab.Screen name="Ajustes" component={PreferencesNavigator} />
		</Tab.Navigator>
	);
}
export default DriverNavigator;
