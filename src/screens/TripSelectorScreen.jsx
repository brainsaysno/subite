import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { List } from "react-native-paper";
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

	const { mapData } = route.params;

	useEffect(() => {
		if (user) {
			db.collection("trips")
				.where("institutionName", "==", user.institution.name)
				.orderBy("departureTime")
				.get()
				.then((querySnapshot) => {
					const data = querySnapshot.docs.map((doc) => doc.data());
					const filteredData = data.filter((d) => {
						return (
							isInRadius(d.polyline, mapData.markerCoordinates, user.radius) &&
							d.driver.uid !== user.uid
							/* TODO: Filter for departureTime > Date.now() */
						);
					});
					const comps = filteredData.map((trip, i) => (
						<TripListComponent trip={trip} key={i} navigation={navigation} />
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
				<Text>Sorry, no trips were found in your radius!</Text>
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
