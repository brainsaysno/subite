import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { List } from "react-native-paper";
import TripListComponent from "../components/TripListComponent";
import { latitudeToKm } from "../core/utils";
import { collection, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";

import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import Loading from "../components/Loading";

function TripSelectorScreen({ navigation }) {
	const [tripListComponents, setTripListComponents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(AuthenticatedUserContext);

	//const tripsRef = collection(db, "trips");
	useEffect(() => {
		if (user) {
			db.collection("trips")
				.where("institutionName", "==", user.institution.name)
				.orderBy("departureTime")
				.get()
				.then((querySnapshot) => {
					const data = querySnapshot.docs.map((doc) => doc.data());
					const comps = data.map((trip, i) => (
						<TripListComponent trip={trip} key={i} navigation={navigation} />
					));
					setIsLoading(false);
					setTripListComponents(comps);
					console.log(data);
				});
		}
	}, []);

	if (isLoading) return <Loading />;

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
