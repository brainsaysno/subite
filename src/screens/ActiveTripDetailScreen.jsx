import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles";
import moment from "moment-with-locales-es6";
import WidgetMapView from "../components/WidgetMapView";
import { Icon } from "react-native-eva-icons";
import { useTheme } from "react-native-paper";
import PassengerListComponent from "../components/PassengerListComponent";

function ActiveTripDetailScreen({ navigation, route }) {
  const { trip, userCoordinates } = route.params;
  const { colors } = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 30,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontStyle: "italic",
            fontWeight: "400",
            fontSize: 20,
            color: colors.text,
            textAlign: "center",
          }}
        >
          {moment(trip.departureTime).locale("es").format("l")}
        </Text>
        <Text
          style={{
            fontStyle: "italic",
            fontWeight: "300",
            fontSize: 20,
            color: colors.text,
            textAlign: "center",
          }}
        >
          <Text style={{ fontWeight: "500" }}>Salida: </Text>
          {moment(trip.departureTime).locale("es").format("HH:mm")}
        </Text>
      </View>
      <WidgetMapView
        polyline={trip.polyline}
        navigation={navigation}
        passengerCoordinates={
          userCoordinates
            ? userCoordinates
            : trip.passengerData.length === 0
            ? null
            : trip.passengerData.map((pData) => [pData.location].flat(10)[0])
        }
      />
      <View
        style={{
          display: "flex",
          alignItems: "flex-start",
          width: "90%",
        }}
      >
        {trip.passengerData.length === 0 ? (
          <Text style={{ alignSelf: "center", fontSize: 20 }}>
            Nadie se subió a tu viaje todavía
          </Text>
        ) : (
          <Text style={{ marginBottom: 10 }}>
            Pasajeros: {trip.passengerData.length}/{trip.capacity}
          </Text>
        )}
        {trip.passengerData.length !== 0
          ? trip.passengerData.map((p) => (
              <PassengerListComponent passenger={p} key={p.fullName} />
            ))
          : null}
      </View>
    </ScrollView>
  );
}

export default ActiveTripDetailScreen;
