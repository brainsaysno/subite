import React, { Component, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import styles from "../styles";

export default class CreateTripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerCoordinates: {},
    };
    this.handleMapPress = this.handleMapPress.bind(this);
  }

  handleMapPress({ coordinate }) {
    console.log("press");
    this.setState({
      markerCoordinates: coordinate,
    });
  }

  render() {
    console.log(this.state);
    return (
      <MapView
        style={styles.map}
        onPress={(e) => this.handleMapPress(e.nativeEvent)}
        initialRegion={{
          latitude: -34.907071,
          longitude: -56.168248,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {Object.entries(this.state.markerCoordinates).length ? (
          <>
            <Marker coordinate={this.state.markerCoordinates}></Marker>
            <Polyline
              coordinates={[
                this.state.markerCoordinates,
                { latitude: -34.903852, longitude: -56.190639 },
              ]}
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
}
