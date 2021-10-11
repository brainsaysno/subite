import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { List, useTheme } from "react-native-paper";
import TodayTripListComponent from "../components/TodayTripListComponent";
import { isInRadius, isToday, latitudeToKm } from "../core/utils";
import { collection, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";

import { AppContext } from "../../navigation/AppProvider";
import Loading from "../components/Loading";
import styles from "../styles";
import OtherTripListComponent from "../components/OtherTripListComponent";

function TripSelectorScreen({ navigation, route }) {
	const [tripListComponents, setTripListComponents] = useState({
		today: [],
		others: [],
	});
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
					let todayComponents = filteredData.filter((trip) =>
						isToday(new Date(trip.departureTime))
					);

					todayComponents.sort((a, b) => a.departureTime - b.departureTime);

					todayComponents = todayComponents.map((trip, i) => (
						<TodayTripListComponent
							trip={trip}
							key={i}
							navigation={navigation}
							userCoordinates={[mapData.markerCoordinates]}
							confirmNavigate
						/>
					));
					let otherComponents = filteredData.filter(
						(trip) => !isToday(new Date(trip.departureTime))
					);

					otherComponents.sort((a, b) => a.departureTime - b.departureTime);
					otherComponents = otherComponents.map((trip, i) => (
						<OtherTripListComponent
							trip={trip}
							key={i}
							navigation={navigation}
							userCoordinates={[mapData.markerCoordinates]}
							confirmNavigate
						/>
					));

					setIsLoading(false);
					setTripListComponents({
						today: todayComponents,
						others: otherComponents,
					});
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
			{tripListComponents.today.length === 0 ? null : (
				<List.Section>
					<List.Subheader>Hoy</List.Subheader>
					{tripListComponents.today}
				</List.Section>
			)}
			{tripListComponents.others.length === 0 ? null : (
				<List.Section>
					<List.Subheader>Otros</List.Subheader>
					{tripListComponents.others}
				</List.Section>
			)}
		</ScrollView>
	);
}

export default TripSelectorScreen;
