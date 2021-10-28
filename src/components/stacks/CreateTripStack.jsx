import React from "react";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreen from "../../screens/DefaultScreen";
import ConfirmTripScreen from "../../screens/ConfirmTripScreen";
import CreateTripScreen from "../../screens/CreateTripScreen";

const Stack = createNativeStackNavigator();

function CreateTripNavigator() {
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
      <Stack.Screen name="Mapa" component={CreateTripScreen} />
      <Stack.Screen name="Confirmar viaje" component={ConfirmTripScreen} />
      <Stack.Screen
        name="Default Screen"
        component={DefaultScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default CreateTripNavigator;
