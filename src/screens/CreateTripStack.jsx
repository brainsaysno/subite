import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, List } from "react-native-paper";
import CreateTripScreen from "./CreateTripScreen";
import DefaultScreen from "./DefaultScreen";
import TripSelectorScreen from "./TripSelectorScreen";

const Stack = createNativeStackNavigator();

function CreateTripNavigation(props) {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen name="Map">
        {(navProps) => (
          <CreateTripScreen
            {...navProps}
            darkModeToggle={props.darkModeToggle}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Trip Selector">
        {(navProps) => (
          <TripSelectorScreen
            {...navProps}
            darkModeToggle={props.darkModeToggle}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="df" component={DefaultScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default CreateTripNavigation;
