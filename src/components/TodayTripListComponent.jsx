import moment from "moment";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { List, useTheme } from "react-native-paper";

function TodayTripListComponent({
  trip,
  userCoordinates,
  navigation,
  confirmNavigate,
}) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          confirmNavigate === true ? "Resumen del viaje" : "Detalle de viaje",
          {
            trip: trip,
            userCoordinates: userCoordinates,
          }
        );
      }}
    >
      <List.Item
        // TODO: Decide on fullName vs firstName
        title={trip.driver.fullName /* .split(" ")[0] */}
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
              {moment(trip.departureTime).format("HH:mm")}
            </Text>
          </View>
        )}
      ></List.Item>
    </TouchableOpacity>
  );
}

export default TodayTripListComponent;
