import React from "react";
import { View, List } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import DefaultScreen from "../../screens/DefaultScreen";
import TripSelectorScreen from "../../screens/TripSelectorScreen";
import ConfirmTripScreen from "../../screens/ConfirmTripScreen";
import CreateTripScreen from "../../screens/CreateTripScreen";

const Stack = createNativeStackNavigator();

function CreateTripNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="Mapa"
			screenOptions={({ route }) => {
				if (route.name === "Mapa") return { headerShown: false };
			}}
		>
			<Stack.Screen name="Mapa" component={CreateTripScreen} />
			<Stack.Screen name="Confirmar viaje" component={ConfirmTripScreen} />
			<Stack.Screen
				name="Default Screen"
				component={DefaultScreen}
			></Stack.Screen>
		</Stack.Navigator>
	);
}

export default CreateTripNavigator;
