import "react-native-gesture-handler";
import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { StatusBar as StatBar } from "expo-status-bar";
import * as Device from "expo-device";
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import BottomNavbar from "./src/components/BottomNavbar";
import styles from "./src/styles.js";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import NotAuthedScreen from "./src/screens/NotAuthedScreen";

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

const authed = true;

export default function App() {
  const [darkModeOn, setDarkModeOn] = useState(true); // Change!!!
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
        {authed ? (
          <BottomNavbar darkModeToggle={darkModeToggle} />
        ) : (
          <NotAuthedScreen />
        )}
        <StatBar style={darkModeOn ? "light" : "dark"} />
      </NavigationContainer>
    </PaperProvider>
  );
}
