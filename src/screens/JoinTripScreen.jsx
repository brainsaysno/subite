import React, { useEffect, useState } from "react";
import { View, Text, Button, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../../mapStyles";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import TripSelectorScreen from "./TripSelectorScreen";
import { decode } from "@googlemaps/polyline-codec";
import { GOOGLE_MAPS_API_KEY } from "../../keys.js";

function JoinTripScreen({ navigation, ...props }) {
  const { dark, colors } = useTheme();
  const [mapData, setMapData] = useState({ markerOn: false });

  const handleMapPress = ({ coordinate }) => {
    setMapData({ markerOn: true, markerCoordinates: coordinate });
  };

  useEffect(() => {
    console.log(mapData);
  }, []);

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={dark ? darkMapStyle : []}
        onPress={(e) => handleMapPress(e.nativeEvent)}
        initialRegion={{
          latitude: -34.907071,
          longitude: -56.168248,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {mapData.markerOn ? (
          <Marker coordinate={mapData.markerCoordinates}></Marker>
        ) : null}
      </MapView>
      {mapData.markerOn ? (
        <ConfirmButton
          navigation={navigation}
          coordinates={mapData.markerCoordinates}
        />
      ) : null}
    </>
  );
}

function ConfirmButton({ navigation, coordinates }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,

        //TODO: Change this crap!
        left: Dimensions.get("screen").width / 2 - 40,

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Me gusta"
        onPress={() => {
          navigation.navigate("Trip Selector", {
            markerCoordinates: coordinates,
          });
          console.log("Coordinates selected: " + coordinates);
        }}
      />
    </View>
  );
}

export default JoinTripScreen;
