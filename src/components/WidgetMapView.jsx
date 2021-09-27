import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../../mapStyles";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import { decode } from "@googlemaps/polyline-codec";
import { AppContext } from "../../navigation/AppProvider";
import { InteractionManager } from "react-native";

function WidgetMapView({ polyline, navigation, passengerCoordinates }) {
	const decodedTrip = decode(polyline, 5).map((arr) => ({
		latitude: arr[0],
		longitude: arr[1],
	}));

	const [show, setShow] = useState(false);

	useEffect(() => {
		navigation.addListener("transitionEnd", (e) => {
			setShow(true);
		});
		navigation.addListener("transitionStart", (e) => {
			setShow(false);
		});
	}, []);

	const { dark, colors } = useTheme();

	if (!show) return <View style={mapStyles.map} />;

	return (
		<MapView
			provider={PROVIDER_GOOGLE}
			style={mapStyles.map}
			customMapStyle={dark ? darkMapStyle : []}
			/* initialRegion={{
				latitude: -34.907071,
				longitude: -56.168248,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}} */
			initialRegion={{
				latitude:
					decodedTrip[(decodedTrip.length - (decodedTrip.length % 2)) / 2]
						.latitude,
				longitude:
					decodedTrip[[(decodedTrip.length - (decodedTrip.length % 2)) / 2]]
						.longitude,
				latitudeDelta: 0.03,
				longitudeDelta: 0.03,
			}}
		>
			{/* Departure coordinates marker */}
			<Marker coordinate={decodedTrip[0]} pinColor="red"></Marker>
			{/* Arrival coordinates marker */}
			<Marker coordinate={decodedTrip[decodedTrip.length - 1]}></Marker>
			{/* Passenger coordinates marker */}
			{passengerCoordinates.map((pCoord, i) => (
				<Marker key={i} coordinate={pCoord} pinColor="blue" />
			))}
			<Polyline
				coordinates={decodedTrip}
				lineDashPattern={[1, 8]}
				strokeWidth={5}
				strokeColor={dark ? "#fff" : "#000"}
			></Polyline>
		</MapView>
	);
}

export default WidgetMapView;

const mapStyles = StyleSheet.create({
	map: {
		height: 200,
		width: Dimensions.get("screen").width,
		marginVertical: 20,
	},
});
