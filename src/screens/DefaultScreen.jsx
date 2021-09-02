import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

function DefaultScreen(props) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.text }}>Hey, test here!</Text>
    </View>
  );
}

export default DefaultScreen;
