import React, { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import styles from "../styles";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";

function ConfirmTripScreen({ navigation, route }) {
	const { tripData } = route.params;
	const { user } = useContext(AppContext);

	// TODO: Add capacity picker
	const [capacity, setCapacity] = useState(3);

	const handlePress = () => {
		const newTripData = {
			polyline: tripData.routes[0].overview_polyline.points,
			departureTime: Date.now(),
			capacity: capacity,
			driver: {
				uid: user.uid,
				fullName: user.fullName,
				phone: user.phone,
				plate: "***" + user.plate.slice(3),
				childName: user.childName,
			},
			institutionName: user.institution.name,
			passengerCount: 0,
		};
		db.collection("trips")
			.add(newTripData)
			.then((docRef) => {
				console.log("Document written with ID: ", docRef.id);
				navigation.navigate("Trip Success", { docID: docRef.id });
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};

	return (
		<View style={styles.container}>
			<Text>{tripData.routes[0].overview_polyline.points}</Text>

			<Button title={"DEV Confirm"} onPress={handlePress}></Button>
		</View>
	);
}

export default ConfirmTripScreen;
