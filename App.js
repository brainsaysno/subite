import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { StatusBar as StatBar } from "expo-status-bar";
import * as Device from "expo-device";
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import BottomNavbar from "./src/components/PassengerNavigator";
import styles from "./src/styles.js";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import NotAuthedScreen from "./src/screens/NotAuthedScreen";
import PassengerNavigator from "./src/components/PassengerNavigator";
import DriverNavigator from "./src/components/DriverNavigator";
import LoginStack from "./src/components/stacks/LoginStack";
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
} from "./navigation/AuthenticatedUserProvider";
import Firebase from "./config/firebase";
import RootNavigator from "./src/components/RootNavigator";

/* const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "green",
  },
}; */

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    text: "tomato",
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

export default function App() {
  // FIXME: DEV! Issue #7 https://github.com/VendedorDeWards/subite/issues/7
  //const [authed, setAuthed] = useState(false);

  const [darkModeOn, setDarkModeOn] = useState(false); // Change!!!

  const darkModeToggle = () => {
    setDarkModeOn(!darkModeOn);
  };

  return (
    <PaperProvider
      theme={darkModeOn ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      <NavigationContainer
        theme={darkModeOn ? CombinedDarkTheme : CombinedDefaultTheme}
      >
        <AuthenticatedUserProvider>
          <RootNavigator darkModeToggle={darkModeToggle} />
        </AuthenticatedUserProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
