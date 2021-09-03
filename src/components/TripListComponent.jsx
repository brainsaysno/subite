import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-eva-icons";
import { List, useTheme } from "react-native-paper";
import styles from "../styles";

function TripListComponent({ trip, navigation }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Default Screen");
      }}
    >
      <List.Item
        title={trip.driverName}
        description={
          trip.passengerCount.toString() + "/" + trip.capacity.toString()
        }
        //TODO: Fix styles
        left={() => (
          <View
            style={{
              width: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.text, fontSize: 25 }}>
              {trip.arrivalTime}
            </Text>
          </View>
        )}
        right={() => <List.Icon icon="chevron-right" />}
      ></List.Item>
    </TouchableOpacity>
  );
}

export default TripListComponent;
