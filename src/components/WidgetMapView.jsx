import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../../mapStyles";
import { useTheme } from "react-native-paper";
import { decode } from "@googlemaps/polyline-codec";
import { Icon } from "react-native-eva-icons";

function WidgetMapView({ polyline, navigation, passengerCoordinates, style }) {
  const decodedTrip = decode(polyline, 5).map((arr) => ({
    latitude: arr[0],
    longitude: arr[1],
  }));

  const [show, setShow] = useState(Platform.OS === "ios" ? false : true);

  useEffect(() => {
    if (Platform.OS === "ios") {
      navigation.addListener("transitionEnd", (e) => {
        setShow(true);
      });
      navigation.addListener("transitionStart", (e) => {
        setShow(false);
      });
    }
  }, []);

  const { dark, colors } = useTheme();

  if (!show) return <View style={mapStyles.map} />;

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ ...mapStyles.map, ...style }}
      customMapStyle={dark ? darkMapStyle : []}
      initialRegion={{
        latitude:
          (decodedTrip[0].latitude +
            decodedTrip[decodedTrip.length - 1].latitude) /
            2 +
          0.002,
        longitude:
          (decodedTrip[0].longitude +
            decodedTrip[decodedTrip.length - 1].longitude) /
          2,
        latitudeDelta:
          Math.abs(
            decodedTrip[0].latitude -
              decodedTrip[decodedTrip.length - 1].latitude
          ) + 0.02,
        longitudeDelta:
          Math.abs(
            decodedTrip[0].longitude -
              decodedTrip[decodedTrip.length - 1].longitude
          ) + 0.02,
      }}
    >
      {/* Departure coordinates marker */}
      <Marker coordinate={decodedTrip[0]} pinColor={colors.primary}></Marker>
      {/* Arrival coordinates marker */}
      <Marker coordinate={decodedTrip[decodedTrip.length - 1]}>
        <Icon name={"home"} width={20} height={20} fill={colors.yellow} />
      </Marker>
      {/* Passenger coordinates marker */}
      {passengerCoordinates
        ? passengerCoordinates.map((pCoord, i) => (
            <Marker key={i} coordinate={pCoord} pinColor={colors.blue} />
          ))
        : null}
      <Polyline
        coordinates={decodedTrip}
        lineDashPattern={[0]}
        strokeWidth={5}
        strokeColor={dark ? "#fff" : "#000"}
      ></Polyline>
    </MapView>
  );
}

export default WidgetMapView;

const mapStyles = StyleSheet.create({
  map: {
    width: "90%",
    height: 300,
    marginVertical: 20,
  },
});
