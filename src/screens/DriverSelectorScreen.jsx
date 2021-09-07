import React from "react";
import { Alert, Button, View } from "react-native";
import styles from "../styles";

function DriverSelectorScreen({ navigation }) {
  return (
    <View style={{ flexDirection: "row", ...styles.container }}>
      <Button
        onPress={() => {
          Alert.alert("Dev alert", "You are a driver");
          navigation.navigate("Login", {
            isDriver: true,
          });
        }}
        title="Driver"
      ></Button>
      <Button
        onPress={() => {
          Alert.alert("Dev alert", "You are a passenger");
          navigation.navigate("Login", {
            isDriver: false,
          });
        }}
        title="Passenger"
      ></Button>
    </View>
  );
}

export default DriverSelectorScreen;
