import React from "react";
import { View, List } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import DefaultScreen from "../../screens/DefaultScreen";
import TripDetailScreen from "../../screens/TripDetailScreen";
import TripSelectorScreen from "../../screens/TripSelectorScreen";

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
			<Stack.Screen name="Trip Detail" component={TripDetailScreen} />
			<Stack.Screen name="Default Screen" component={DefaultScreen} />
		</Stack.Navigator>
	);
}

export default JoinTripNavigator;
