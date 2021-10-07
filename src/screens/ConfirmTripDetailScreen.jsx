import React, { useContext, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import WidgetMapView from "../components/WidgetMapView";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";
import moment from "moment-with-locales-es6";
import Button from "../components/Button";
function ConfirmTripDetailScreen({ navigation, route }) {
	const { trip, userCoordinates } = route.params;
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
						location: userCoordinates,
						uid: user.uid,
					},
				],
				passengerUids: [...trip.passengerUids, user.uid],
			})
			.then(() => {
				navigation.navigate("Recent Trips");
				navigation.navigate("Trip Detail", {
					trip: trip,
					userCoordinates: userCoordinates,
				});
			})
			.catch((e) =>
				console.error(`There was an error while joining trip: ${e}`)
			);
	};

	return (
		<View style={styles.container}>
			<Text
				style={{
					fontWeight: "400",
					fontSize: 30,
					color: colors.text,
					textAlign: "center",
					marginBottom: 20,
				}}
			>
				<Text style={{ fontWeight: "500" }}>Conductor: </Text>
				{trip.driver.fullName}
			</Text>
			<Text
				style={{
					fontStyle: "italic",
					fontWeight: "400",
					fontSize: 20,
					color: colors.text,
					textAlign: "center",
				}}
			>
				{moment(trip.departureTime).locale("es").format("LL")}
			</Text>
			<Text
				style={{
					fontStyle: "italic",
					fontWeight: "300",
					fontSize: 20,
					color: colors.text,
					textAlign: "center",
				}}
			>
				<Text style={{ fontWeight: "400" }}>Salida: </Text>
				{moment(trip.departureTime).locale("es").format("HH:mm")}
			</Text>
			<Text
				style={{ fontStyle: "italic", fontWeight: "200", color: colors.text }}
			>
				Capacidad: {trip.passengerCount}/{trip.capacity}
			</Text>
			<WidgetMapView
				polyline={trip.polyline}
				navigation={navigation}
				passengerCoordinates={userCoordinates}
			/>
			<Button onPress={confirmTrip} mode="contained">
				Confirm
			</Button>
		</View>
	);
}

export default ConfirmTripDetailScreen;
