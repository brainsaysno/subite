import React from "react";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreen from "../../screens/DefaultScreen";
import ActiveTripsScreen from "../../screens/ActiveTripsScreen";
import ActiveTripDetailScreen from "../../screens/ActiveTripDetailScreen";

const Stack = createNativeStackNavigator();

function ActiveTripsNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Viajes activos"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: colors.dbackground },
      }}
    >
      <Stack.Screen name="Viajes activos" component={ActiveTripsScreen} />
      <Stack.Screen
        name="Detalle de viaje"
        component={ActiveTripDetailScreen}
      />
      <Stack.Screen
        name="Default Screen"
        component={DefaultScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default ActiveTripsNavigator;
