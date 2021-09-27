import React, { useContext, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import WidgetMapView from "../components/WidgetMapView";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";

function TripDetailScreen({ navigation, route }) {
	const { trip, passengerCoordinates } = route.params;
	const { colors } = useTheme();

	return (
		<View style={styles.container}>
			<Text style={{ fontWeight: "500", fontSize: 30, color: colors.text }}>
				Driver name: {trip.driver.fullName}
			</Text>
			<Text
				style={{
					fontStyle: "italic",
					fontWeight: "300",
					fontSize: 20,
					color: colors.text,
				}}
			>
				Departure Time: {new Date(trip.departureTime).getDate().toString()}
				{", "}
				{new Date(trip.departureTime).getHours().toString()}:
				{new Date(trip.departureTime).getMinutes().toString()}
			</Text>
			<Text
				style={{ fontStyle: "italic", fontWeight: "200", color: colors.text }}
			>
				Capacity: {trip.passengerCount}/{trip.capacity}
			</Text>
			<WidgetMapView
				polyline={trip.polyline}
				navigation={navigation}
				passengerCoordinates={passengerCoordinates}
			/>
		</View>
	);
}

export default TripDetailScreen;
