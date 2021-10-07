import React, { useContext, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import styles from "../styles";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";
import HorizontalNumberPicker from "../components/NumberPicker";
import { useTheme } from "react-native-paper";
import Button from "../components/Button";

function ConfirmTripScreen({ navigation, route }) {
	const { mapData } = route.params;
	const { user } = useContext(AppContext);
	const { colors } = useTheme();

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
			passengerData: [],
			passengerUids: [],
			institutionName: user.institution.name,
			passengerCount: 0,
		};
		db.collection("trips")
			.add(tripData)
			.then((docRef) => {
				navigation.navigate("Map");
				navigation.navigate("Trips");
				navigation.navigate("Trip Detail", { trip: tripData });
				//				navigation.navigate("Trip Success", { docID: docRef.id });
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};

	return (
		<View style={styles.container}>
			<Text style={{ textAlign: "center", fontWeight: "400", fontSize: 18 }}>
				Fecha y hora:
			</Text>
			<View
				style={{
					backgroundColor: colors.accent,
					width: Dimensions.get("screen").width,
					height: 200,
					marginVertical: 20,
				}}
			></View>
			<HorizontalNumberPicker
				value={capacity}
				onChange={setCapacity}
				min={1}
				max={4}
				title={"Capacidad"}
			/>
			<Button onPress={handlePress} mode="contained" style={{ width: 150 }}>
				Crear viaje
			</Button>
		</View>
	);
}

export default ConfirmTripScreen;
