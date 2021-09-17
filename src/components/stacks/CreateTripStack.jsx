import React from "react";
import { View, List } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import DefaultScreen from "../../screens/DefaultScreen";
import TripDetailScreen from "../../screens/TripDetailScreen";
import TripSelectorScreen from "../../screens/TripSelectorScreen";
import ConfirmTripScreen from "../../screens/ConfirmTripScreen";
import CreateTripScreen from "../../screens/CreateTripScreen";

const Stack = createNativeStackNavigator();

function CreateTripNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={({ route }) => {
        if (route.name === "Map") return { headerShown: false };
      }}
    >
      <Stack.Screen name="Map">
        {(navProps) => (
          <CreateTripScreen
            {...navProps}
            darkModeToggle={props.darkModeToggle}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Confirm Create Trip">
        {(navProps) => <ConfirmTripScreen {...navProps} />}
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

export default CreateTripNavigator;
