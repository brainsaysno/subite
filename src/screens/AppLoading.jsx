import React from "react";
import { useContext } from "react";
import { View, Image } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { AppContext } from "../../navigation/AppProvider";
import Logo from "../components/Logo";
import styles from "../styles";

function AppLoading() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.dbackground,
        width: "100%",
        height: "100%",
      }}
    >
      <Logo />
      <ActivityIndicator size="large" style={{ marginTop: 20 }} />
    </View>
  );
}

export default AppLoading;
