import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { List, useTheme } from "react-native-paper";
import TripListComponent from "../components/TripListComponent";
import { latitudeToKm } from "../core/utils";
import { collection, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";

import { tripData } from "../../dummy";
import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";

function RecentTripsScreen({ navigation }) {
	const [tripListComponents, setTripListComponents] = useState([]);
	const { user } = useContext(AppContext);
	const { colors } = useTheme();

	useEffect(() => {
		if (user) {
			console.log(user.uid);
			const unsub = db
				.collection("trips")
				.where("passengerUids", "array-contains", user.uid)
				.onSnapshot((querySnapshot) => {
					console.log("snap");
					const data = querySnapshot.docs.map((doc) => doc.data());
					const components = data.map((trip, i) => {
						return (
							<TripListComponent
								trip={trip}
								key={i}
								navigation={navigation}
								passengerCoordinates={[
									trip.passengerData.filter(
										(pData) => pData.uid === user.uid
									)[0].location,
								].flat(10)}
							/>
						);
					});

					setTripListComponents(components);
				});
			return unsub;
		}
	}, []);

	if (tripListComponents.length === 0)
		return (
			<View style={styles.container}>
				<Text color={colors.text}>You have not made any trips yet!</Text>
				{/* TODO: Button "Join a trip now", navigate to join trip */}
			</View>
		);

	return (
		<ScrollView>
			<List.Section>
				<List.Subheader>Active</List.Subheader>
				{tripListComponents}
				<List.Subheader>Recent</List.Subheader>
			</List.Section>
		</ScrollView>
	);
}

export default RecentTripsScreen;