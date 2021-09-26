import React, { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import styles from "../styles";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";
import HorizontalNumberPicker from "../components/NumberPicker";

function ConfirmTripScreen({ navigation, route }) {
	const { mapData } = route.params;
	const { user } = useContext(AppContext);

	// TODO: Add capacity picker
	const [capacity, setCapacity] = useState(1);

	const handlePress = () => {
		const tripData = {
			polyline: mapData.routes[0].overview_polyline.points,
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
			.add(tripData)
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
			<HorizontalNumberPicker
				value={capacity}
				onChange={setCapacity}
				min={1}
				max={4}
				title={"Capacity"}
			/>
			<Text>{mapData.routes[0].overview_polyline.points}</Text>
			<Button title={"DEV Confirm"} onPress={handlePress}></Button>
		</View>
	);
}

export default ConfirmTripScreen;
