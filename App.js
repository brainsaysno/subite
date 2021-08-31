import React, {useRef, useState} from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { StatusBar as StatBar } from "expo-status-bar";
import * as Device from "expo-device";
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import BottomNavbar from "./components/BottomNavbar";
import styles from "./styles.js";

/* const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "green",
  },
}; */

const lightTheme = { dark: false, ...DefaultTheme };
const darkTheme = { ...DarkTheme };

const authed = true;

export default function App() {
  const [darkModeOn, setDarkModeOn] = useState(true); // Change!!!
  const darkThemeToggle = () => {
    setDarkModeOn(!darkModeOn)
  }
  return (
    <PaperProvider theme={darkModeOn ? darkTheme : lightTheme}>
      {authed ? (
        <BottomNavbar darkThemeToggle={darkThemeToggle}/>
      ) : (
        <View style={styles.container}>
          <Text>Not authed</Text>
        </View>
      )}
      <StatBar style={darkModeOn ? "light" : "dark"} />
    </PaperProvider>
  );
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
