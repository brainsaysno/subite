import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";

function TripListComponent({ trip, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("df");
      }}
    >
      <List.Item
        title={trip.driverName}
        left={() => {
          return <Text style={{ color: "white" }}>{trip.arrivalTime}</Text>;
        }}
      ></List.Item>
    </TouchableOpacity>
  );
}

export default TripListComponent;
