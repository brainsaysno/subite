import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { List } from "react-native-paper";
import TripListComponent from "../components/TripListComponent";
import { latitudeToKm } from "../core/utils";
import { collection, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";

import { tripData } from "../../dummy";
import { AppContext } from "../../navigation/AppProvider";

function ActiveTripsScreen({ navigation }) {
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
							<TripListComponent
								trip={trip}
								key={i}
								navigation={navigation}
								passengerCoordinates={
									trip.passengerData.length === 0
										? null
										: trip.passengerData.map(
												(pData) => [pData.location].flat(10)[0]
										  )
								}
							/>
						);
					});

					setTripListComponents(components);
				});
			return unsub;
		}
	}, []);
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
