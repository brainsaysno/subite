import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

function DefaultScreen({ isDriver }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.text }}>Hey, test here!</Text>
      <Text style={{ color: colors.text }}>
        You are a {isDriver ? "driver!" : "passenger!"}
      </Text>
    </View>
  );
}

export default DefaultScreen;
