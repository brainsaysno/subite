import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import { useTheme } from "react-native-paper";

function TripDetailScreen({ navigation, route }) {
	const { trip } = route.params;
	const { colors } = useTheme();
	useEffect(() => {
		console.log(trip);
	}, []);
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
		</View>
	);
}

export default TripDetailScreen;
