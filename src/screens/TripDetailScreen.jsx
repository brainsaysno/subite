import React, { useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, Linking } from "react-native";
import styles from "../styles";
import { Button, useTheme } from "react-native-paper";
import WidgetMapView from "../components/WidgetMapView";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";
import { Icon } from "react-native-eva-icons";
import moment from "moment-with-locales-es6";

function TripDetailScreen({ navigation, route }) {
  const { trip, userCoordinates } = route.params;
  const { colors } = useTheme();
  const { user } = useContext(AppContext);

  const message = user ? `Hola, soy ${user.fullName}` : null;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
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
          backgroundColor: colors.error,
          padding: 15,
          marginTop: "auto",
          marginBottom: "auto",
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
          ¡Coordina el punto de encuentro!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default TripDetailScreen;
