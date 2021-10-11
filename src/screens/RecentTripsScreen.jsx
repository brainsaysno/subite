import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { List, useTheme } from "react-native-paper";
import TodayTripListComponent from "../components/TodayTripListComponent";
import { db } from "../../config/firebase";

import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";
import Button from "../components/Button";

function RecentTripsScreen({ navigation }) {
	const [tripListComponents, setTripListComponents] = useState([]);
	const { user } = useContext(AppContext);
	const { colors } = useTheme();

	useEffect(() => {
		if (user) {
			const unsub = db
				.collection("trips")
				.where("passengerUids", "array-contains", user.uid)
				.onSnapshot((querySnapshot) => {
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
				<Button onPress={() => navigation.navigate("Nuevo Viaje")}>
					Join a trip now
				</Button>
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
