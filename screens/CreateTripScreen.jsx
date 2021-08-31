import React, { Component, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "../styles";

function CreateTripScreen(props) {
  const [markerCoordinates, setMarkerCoordinates] = useState({});

  const handleMapPress = ({coordinate}) => {
    console.log("press");
    setMarkerCoordinates(coordinate);
  }
  return (<MapView
  provider={PROVIDER_GOOGLE}
  style={styles.map}
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
      <Marker coordinate={markerCoordinates}>
        
      </Marker>
      <Polyline
        coordinates={[
          markerCoordinates,
          { latitude: -34.903852, longitude: -56.190639 },
        ]}
        lineDashPattern={[0]}
      ></Polyline>
    </>
  ) : null}
  {/* <Marker coordinate={this.state.region}>
    CUSTOM MARKER!!! <View style={{ backgroundColor: "red", padding: 10 }}>
      <Text>SF</Text>
    </View> 
  </Marker> */}
</MapView>
  );
}

export default CreateTripScreen;
