import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { List, useTheme } from "react-native-paper";
import TripListComponent from "../components/TripListComponent";
import { isInRadius, latitudeToKm } from "../core/utils";
import { collection, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";

import { AppContext } from "../../navigation/AppProvider";
import Loading from "../components/Loading";
import styles from "../styles";

function TripSelectorScreen({ navigation, route }) {
	const [tripListComponents, setTripListComponents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(AppContext);
	const { colors } = useTheme();

	const { mapData } = route.params;

	useEffect(() => {
		if (user) {
			db.collection("trips")
				.where("institutionName", "==", user.institution.name)
				.where("passengerUids", "not-in", [[user.uid]])
				.orderBy("passengerUids")
				.orderBy("departureTime")
				.get()

				.then((querySnapshot) => {
					const data = querySnapshot.docs.map((doc) => {
						return { ...doc.data(), tripId: doc.id };
					});
					const filteredData = data.filter((d) => {
						return (
							isInRadius(d.polyline, mapData.markerCoordinates, user.radius) &&
							d.driver.uid !== user.uid &&
							d.passengerCount < d.capacity

							/* TODO: Filter for departureTime > Date.now() */
						);
					});
					const comps = filteredData.map((trip, i) => (
						<TripListComponent
							trip={trip}
							key={i}
							navigation={navigation}
							userCoordinates={[mapData.markerCoordinates]}
							confirmNavigate
						/>
					));
					setIsLoading(false);
					setTripListComponents(comps);
				});
		}
	}, []);

	if (isLoading) return <Loading />;

	if (tripListComponents.length == 0)
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center", color: colors.text }}>
					Sorry, no trips were found in your area, try by increasing your
					radius!
				</Text>
				{/* Button to nav out back to map, to profile and to radius screen */}
			</View>
		);

	return (
		<ScrollView>
			<List.Section>
				<List.Subheader>Hoy</List.Subheader>
				{tripListComponents}
			</List.Section>
		</ScrollView>
	);
}

export default TripSelectorScreen;
