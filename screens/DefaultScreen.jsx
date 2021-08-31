import React from "react";
import { View, Text } from "react-native";

function DefaultScreen(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white" }}>Hey, default here!</Text>
    </View>
  );
}

export default DefaultScreen;
