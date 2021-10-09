import React from "react";
import { View, List } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import DefaultScreen from "../../screens/DefaultScreen";
import ConfirmTripDetailScreen from "../../screens/ConfirmTripDetailScreen";
import TripDetailScreen from "../../screens/TripDetailScreen";
import TripSelectorScreen from "../../screens/TripSelectorScreen";
import JoinTripSuccessScreen from "../../screens/JoinTripSuccessScreen";

const Stack = createNativeStackNavigator();

function JoinTripNavigator(props) {
	return (
		<Stack.Navigator
			initialRouteName="Map"
			screenOptions={({ route }) => {
				if (route.name === "Map") return { headerShown: false };
			}}
		>
			<Stack.Screen name="Map" component={JoinTripScreen} />
			<Stack.Screen name="Trip Selector" component={TripSelectorScreen} />
			<Stack.Screen
				name="Resumen del viaje"
				component={ConfirmTripDetailScreen}
			/>
			<Stack.Screen name="Detalle de viaje" component={TripDetailScreen} />
			<Stack.Screen
				name="Join Trip Success"
				component={JoinTripSuccessScreen}
			/>
			<Stack.Screen name="Default Screen" component={DefaultScreen} />
		</Stack.Navigator>
	);
}

export default JoinTripNavigator;
