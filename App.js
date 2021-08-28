import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Device from "expo-device";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
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

const theme = { ...DefaultTheme };

const authed = true;

export default function App() {
  return (
    <PaperProvider theme={theme}>
      {authed ? (
        <BottomNavbar />
      ) : (
        <View style={styles.container}>
          <Text>Not authed</Text>
        </View>
      )}
    </PaperProvider>
  );
}
