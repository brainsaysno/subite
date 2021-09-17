import React, { useEffect, useState } from "react";
import { View, Text, Button, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../../mapStyles";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import TripSelectorScreen from "./TripSelectorScreen";
import { decode } from "@googlemaps/polyline-codec";
import { GOOGLE_MAPS_API_KEY } from "../../keys.js";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

function CreateTripScreen({ navigation, ...props }) {
  const { dark, colors } = useTheme();
  const [mapData, setMapData] = useState({ markerOn: false });

  const institution = {
    coordinates: {
      latitude: -34.903852,
      longitude: -56.190639,
    },
  };

  const handleMapPress = ({ coordinate }) => {
    fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${coordinate.latitude},${coordinate.longitude}&destination=${institution.coordinates.latitude}, ${institution.coordinates.longitude}&key=${GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const dataToSend = {
          markerCoordinates: coordinate,
          markerOn: true,
          ...data,
        };
        console.log(dataToSend.routes[0].overview_polyline.points);
        setMapData(dataToSend);
      });
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
          <>
            <Marker coordinate={mapData.markerCoordinates}></Marker>
            <Polyline
              coordinates={decode(
                mapData.routes[0].overview_polyline.points,
                5
              ).map((arr) => ({ latitude: arr[0], longitude: arr[1] }))}
              lineDashPattern={[0]}
              strokeWidth={5}
            ></Polyline>
          </>
        ) : null}
      </MapView>
      {mapData.markerOn ? (
        <ConfirmButton navigation={navigation} mapData={mapData} />
      ) : null}
    </>
  );
}

function ConfirmButton({ navigation, mapData }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,

        //TODO: Change this crap!
        left: 0,
        right: 0,
        marginRight: "auto",
        marginLeft: "auto",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Continue"
        onPress={() => {
          navigation.navigate("Confirm Create Trip", {
            tripData: mapData,
          });
          console.log("Coordinates selected: " + mapData.markerCoordinates);
        }}
      />
    </View>
  );
}

export default CreateTripScreen;
