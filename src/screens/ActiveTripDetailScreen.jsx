import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import moment from "moment-with-locales-es6";
import WidgetMapView from "../components/WidgetMapView";
import { Icon } from "react-native-eva-icons";
import { useTheme } from "react-native-paper";
import PassengerListComponent from "../components/PassengerListComponent";
import { db } from "../../config/firebase";

function ActiveTripDetailScreen({ navigation, route }) {
  const { trip, userCoordinates } = route.params;
  const { colors } = useTheme();

  const [tripCancelled, setTripCancelled] = useState(false);
  const [tripCancelling, setTripCancelling] = useState(false);

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
          {moment(trip.departureTime).locale("es").format("L")}
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
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: colors.primary,
          padding: 15,
          marginVertical: 20,
        }}
        onPress={() => {
          setTripCancelling(true);
          db.collection("trips")
            .where("polyline", "==", trip.polyline)
            .where("departureTime", "==", trip.departureTime)
            .get()
            .then((r) => {
              r.docs[0].ref.delete();
              setTripCancelled(true);
              setTimeout(() => navigation.navigate("Viajes activos"), 1000);
            });
        }}
        disabled={tripCancelling}
      >
        <Icon
          name="close-outline"
          width={20}
          height={20}
          fill={colors.background}
          style={{ marginRight: 7 }}
        />
        <Text
          style={{
            color: colors.background,
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          Cancelar el viaje
        </Text>
      </TouchableOpacity>
      {tripCancelled ? (
        <Text style={{ color: colors.primary }}>
          El viaje ha sido cancelado!
        </Text>
      ) : null}
    </ScrollView>
  );
}

export default ActiveTripDetailScreen;
