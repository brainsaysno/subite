import React from "react";
import { View, List } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import DefaultScreen from "../../screens/DefaultScreen";
import TripDetailScreen from "../../screens/TripDetailScreen";
import TripSelectorScreen from "../../screens/TripSelectorScreen";
import ActiveTripsScreen from "../../screens/ActiveTripsScreen";

const Stack = createNativeStackNavigator();

function ActiveTripsNavigator(props) {
	return (
		<Stack.Navigator
			initialRouteName="Active Trips"
			/* 			screenOptions={({ route }) => {
				if (route.name === "Map") return { headerShown: false };
			}} */
		>
			<Stack.Screen name="Active Trips">
				{(navProps) => <ActiveTripsScreen {...navProps} />}
			</Stack.Screen>
			<Stack.Screen name="Trip Detail">
				{(navProps) => <TripDetailScreen {...navProps} />}
			</Stack.Screen>
			<Stack.Screen
				name="Default Screen"
				component={DefaultScreen}
			></Stack.Screen>
		</Stack.Navigator>
	);
}

export default ActiveTripsNavigator;