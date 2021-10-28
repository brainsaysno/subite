import React from "react";
import { View, List, useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import DefaultScreen from "../../screens/DefaultScreen";
import TripDetailScreen from "../../screens/TripDetailScreen";
import RecentTripsScreen from "../../screens/RecentTripsScreen";

const Stack = createNativeStackNavigator();

function RecentTripsNavigator(props) {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Viajes recientes"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: colors.dbackground },
      }}
    >
      <Stack.Screen name="Viajes recientes" component={RecentTripsScreen} />
      <Stack.Screen name="Detalle de viaje" component={TripDetailScreen} />
      <Stack.Screen
        name="Default Screen"
        component={DefaultScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default RecentTripsNavigator;
