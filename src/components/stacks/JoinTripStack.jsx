import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinTripScreen from "../../screens/JoinTripScreen";
import ConfirmTripDetailScreen from "../../screens/ConfirmTripDetailScreen";
import TripDetailScreen from "../../screens/TripDetailScreen";
import TripSelectorScreen from "../../screens/TripSelectorScreen";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();

function JoinTripNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Mapa"
      screenOptions={({ route }) => {
        const def = {
          headerTintColor: "white",
          headerStyle: { backgroundColor: colors.dbackground },
        };
        if (route.name === "Mapa") return { ...def, headerShown: false };
        return def;
      }}
    >
      <Stack.Screen name="Mapa" component={JoinTripScreen} />
      <Stack.Screen name="Seleccionar viaje" component={TripSelectorScreen} />
      <Stack.Screen
        name="Resumen del viaje"
        component={ConfirmTripDetailScreen}
      />
      <Stack.Screen name="Detalle de viaje" component={TripDetailScreen} />
    </Stack.Navigator>
  );
}

export default JoinTripNavigator;
