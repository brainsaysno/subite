import React from "react";
import { View, List } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import DefaultScreen from "../../screens/DefaultScreen";
import TripDetailScreen from "../../screens/TripDetailScreen";
import TripSelectorScreen from "../../screens/TripSelectorScreen";

const Stack = createNativeStackNavigator();

function JoinTripNavigation(props) {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={({ route }) => {
        if (route.name === "Map") return { headerShown: false };
      }}
    >
      <Stack.Screen name="Map">
        {(navProps) => (
          <JoinTripScreen {...navProps} darkModeToggle={props.darkModeToggle} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Trip Selector">
        {(navProps) => <TripSelectorScreen {...navProps} />}
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

export default JoinTripNavigation;
