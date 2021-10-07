import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { List } from "react-native-paper";
import TripListComponent from "../components/TripListComponent";
import { latitudeToKm } from "../core/utils";
import { collection, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";

import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";

function ActiveTripsScreen({ navigation, route }) {
	const [tripListComponents, setTripListComponents] = useState([]);
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

					const components = data.map((trip, i) => {
						return (
							<TripListComponent trip={trip} key={i} navigation={navigation} />
						);
					});

					setTripListComponents(components);
				});
			return unsub;
		}
	}, []);

	if (tripListComponents.length === 0) {
		return (
			<View style={styles.container}>
				<Text>No trips</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			<List.Section>
				<List.Subheader>Hoy</List.Subheader>
				{tripListComponents}
			</List.Section>
		</ScrollView>
	);
}

export default ActiveTripsScreen;
