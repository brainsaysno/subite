import React from "react";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
    </Stack.Navigator>
  );
}

export default RecentTripsNavigator;
