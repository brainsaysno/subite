import React, { Component, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../mapStyles";
import styles from "../styles";
import { useTheme } from "react-native-paper";

function CreateTripScreen(props) {
  const { dark } = useTheme();
  const [markerCoordinates, setMarkerCoordinates] = useState({});

  const handleMapPress = ({ coordinate }) => {
    setMarkerCoordinates(coordinate);
  };
  return (
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
      {Object.entries(markerCoordinates).length ? (
        <>
          <Marker coordinate={markerCoordinates}></Marker>
          <Polyline
            coordinates={[
              markerCoordinates,
              { latitude: -34.903852, longitude: -56.190639 },
            ]}
            lineDashPattern={[0]}
          ></Polyline>
        </>
      ) : null}
    </MapView>
  );
}

export default CreateTripScreen;
