import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import DefaultScreen from "../../screens/DefaultScreen";
import ConfirmTripDetailScreen from "../../screens/ConfirmTripDetailScreen";
import TripDetailScreen from "../../screens/TripDetailScreen";
import TripSelectorScreen from "../../screens/TripSelectorScreen";

const Stack = createNativeStackNavigator();

function JoinTripNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Mapa"
      screenOptions={({ route }) => {
        if (route.name === "Mapa") return { headerShown: false };
      }}
    >
      <Stack.Screen name="Mapa" component={JoinTripScreen} />
      <Stack.Screen name="Seleccionar viaje" component={TripSelectorScreen} />
      <Stack.Screen
        name="Resumen del viaje"
        component={ConfirmTripDetailScreen}
      />
      <Stack.Screen name="Detalle de viaje" component={TripDetailScreen} />
      <Stack.Screen name="Default Screen" component={DefaultScreen} />
    </Stack.Navigator>
  );
}

export default JoinTripNavigator;
