import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { List } from "react-native-paper";
import TodayTripListComponent from "../components/TodayTripListComponent";
import { isToday, latitudeToKm } from "../core/utils";
import { collection, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";

import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";
import OtherTripListComponent from "../components/OtherTripListComponent";

function ActiveTripsScreen({ navigation, route }) {
	const [tripListComponents, setTripListComponents] = useState({
		today: [],
		others: [],
	});
	const { user } = useContext(AppContext);

	//const tripsRef = collection(db, "trips");
	useEffect(() => {
		if (user) {
			const unsub = db
				.collection("trips")
				.where("driver.uid", "==", user.uid)
				.orderBy("departureTime")
				.onSnapshot((querySnapshot) => {
					const data = querySnapshot.docs.map((doc) => doc.data());

					let todayComponents = data.filter((trip) =>
						isToday(new Date(trip.departureTime))
					);

					todayComponents.sort((a, b) => a.departureTime - b.departureTime);

					todayComponents = todayComponents.map((trip, i) => (
						<TodayTripListComponent
							trip={trip}
							key={i}
							navigation={navigation}
						/>
					));

					let otherComponents = data.filter(
						(trip) => !isToday(new Date(trip.departureTime))
					);

					otherComponents.sort((a, b) => a.departureTime - b.departureTime);
					otherComponents = otherComponents.map((trip, i) => (
						<OtherTripListComponent
							trip={trip}
							key={i}
							navigation={navigation}
						/>
					));

					setTripListComponents({
						today: todayComponents,
						others: otherComponents,
					});
				});
			return unsub;
		}
	}, []);

	if (
		tripListComponents.today.length === 0 &&
		tripListComponents.others.length === 0
	) {
		return (
			<View style={styles.container}>
				<Text>No trips</Text>
			</View>
		);
	}

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

export default ActiveTripsScreen;
