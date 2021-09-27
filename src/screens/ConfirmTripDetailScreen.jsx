import React, { useContext, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import WidgetMapView from "../components/WidgetMapView";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";

function ConfirmTripDetailScreen({ navigation, route }) {
	const { trip, passengerCoordinates } = route.params;
	const { colors } = useTheme();
	const { user } = useContext(AppContext);

	const confirmTrip = () => {
		db.collection("trips")
			.doc(trip.tripId)
			.update({
				passengerCount: trip.passengerCount + 1,
				passengerData: [
					...trip.passengerData,
					{
						fullName: user.fullName,
						phone: user.phone,
						location: passengerCoordinates,
						uid: user.uid,
					},
				],
				passengerUids: [...trip.passengerUids, user.uid],
			})
			.then(() =>
				navigation.navigate("Join Trip Success", {
					trip: trip,
				})
			);
		//passengerData = []
		//passengerUids = []
	};

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
			<TouchableOpacity
				style={{
					width: 100,
					height: 50,
					backgroundColor: colors.primary,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				onPress={confirmTrip}
			>
				<Text
					style={{
						color: colors.surface,
						fontWeight: "400",
						textTransform: "uppercase",
					}}
				>
					Confirm
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default ConfirmTripDetailScreen;
