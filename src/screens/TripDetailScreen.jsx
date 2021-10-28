import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper";
import WidgetMapView from "../components/WidgetMapView";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";
import { Icon } from "react-native-eva-icons";
import moment from "moment-with-locales-es6";
import { getEpochNow } from "../core/utils";

function TripDetailScreen({ navigation, route }) {
  const { trip, userCoordinates } = route.params;
  const { colors } = useTheme();
  const { user } = useContext(AppContext);

  const [tripCancelled, setTripCancelled] = useState();

  const message = user ? `Hola, soy ${user.fullName}` : null;
  const epochNow = getEpochNow();
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <View>
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {trip.driver.fullName}
          </Text>
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {trip.driver.plate}
          </Text>
        </View>
        <View>
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
            <Text style={{ fontWeight: "400" }}>Salida: </Text>
            {moment(trip.departureTime).locale("es").format("HH:mm")}
          </Text>
        </View>
      </View>
      {/* <Text
				style={{ fontStyle: "italic", fontWeight: "200", color: colors.text }}
			>
				Capacity: {trip.passengerCount}/{trip.capacity}
			</Text> */}
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
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: colors.green,
          padding: 15,
        }}
        onPress={() =>
          Linking.openURL(
            `https://wa.me/598${trip.driver.phone}?text=${encodeURIComponent(
              message
            )}`
          )
        }
      >
        <Icon
          name="message-circle-outline"
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
          {trip.departureTime > epochNow
            ? "¡Coordina el punto de encuentro!"
            : "¡Enviale un mensaje al conductor!"}
        </Text>
      </TouchableOpacity>
      {trip.departureTime > epochNow ? (
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: colors.primary,
            padding: 15,
            marginVertical: 20,
          }}
          onPress={() =>
            db
              .collection("trips")
              .where("polyline", "==", trip.polyline)
              .where("departureTime", "==", trip.departureTime)
              .get()
              .then((r) => {
                r.docs[0].ref.update({
                  passengerUids: trip.passengerUids.filter(
                    (uid) => uid !== user.uid
                  ),
                  passengerData: trip.passengerData.filter(
                    (p) => p.uid !== user.uid
                  ),
                });
                setTripCancelled(true);
                setTimeout(() => navigation.navigate("Viajes"), 1000);

                console.log(r.docs[0].ref.id);
              })
          }
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
      ) : null}
      {tripCancelled ? (
        <Text style={{ color: colors.primary }}>
          El viaje ha sido cancelado!
        </Text>
      ) : null}
    </ScrollView>
  );
}

export default TripDetailScreen;
