import React from "react";
import { View, List } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import DefaultScreen from "../../screens/DefaultScreen";
import TripSelectorScreen from "../../screens/TripSelectorScreen";
import ConfirmTripScreen from "../../screens/ConfirmTripScreen";
import CreateTripScreen from "../../screens/CreateTripScreen";
import CreateTripSuccessScreen from "../../screens/CreateTripSucessScreen";

const Stack = createNativeStackNavigator();

function CreateTripNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="Map"
			screenOptions={({ route }) => {
				if (route.name === "Map") return { headerShown: false };
			}}
		>
			<Stack.Screen name="Map">
				{(navProps) => <CreateTripScreen {...navProps} />}
			</Stack.Screen>
			<Stack.Screen name="Confirm Create Trip">
				{(navProps) => <ConfirmTripScreen {...navProps} />}
			</Stack.Screen>
			<Stack.Screen name="Trip Success">
				{(navProps) => <CreateTripSuccessScreen {...navProps} />}
			</Stack.Screen>
			<Stack.Screen
				name="Default Screen"
				component={DefaultScreen}
			></Stack.Screen>
		</Stack.Navigator>
	);
}

export default CreateTripNavigator;
