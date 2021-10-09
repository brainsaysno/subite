import React from "react";
import { View, List } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import DefaultScreen from "../../screens/DefaultScreen";
import TripDetailScreen from "../../screens/TripDetailScreen";
import ActiveTripsScreen from "../../screens/ActiveTripsScreen";

const Stack = createNativeStackNavigator();

function ActiveTripsNavigator(props) {
	return (
		<Stack.Navigator
			initialRouteName="Viajes Activos"
			/* 			screenOptions={({ route }) => {
				if (route.name === "Map") return { headerShown: false };
			}} */
		>
			<Stack.Screen name="Viajes Activos" component={ActiveTripsScreen} />
			<Stack.Screen name="Detalle de viaje" component={TripDetailScreen} />
			<Stack.Screen
				name="Default Screen"
				component={DefaultScreen}
			></Stack.Screen>
		</Stack.Navigator>
	);
}

export default ActiveTripsNavigator;
