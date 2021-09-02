import React, { Component, useState } from "react";
import { View, Text, Button, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../../mapStyles";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import TripSelectorScreen from "./TripSelectorScreen";

function CreateTripScreen({ navigation, ...props }) {
  const { dark, colors } = useTheme();
  const [markerCoordinates, setMarkerCoordinates] = useState({});
  const [markerOn, setMarkerOn] = useState(false);

  const handleMapPress = ({ coordinate }) => {
    setMarkerCoordinates(coordinate);
    setMarkerOn(true);
  };
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
        {markerOn ? (
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
      {markerOn ? (
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 130,
            backgroundColor: "white",
            width: 100,
            height: 50,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            title="Me gusta"
            onPress={() => {
              navigation.navigate("Trip Selector");
              console.log(markerCoordinates);
            }}
          />
        </View>
      ) : null}
    </>
  );
}

export default CreateTripScreen;
