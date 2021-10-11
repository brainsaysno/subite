import React, { useContext, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import styles from "../styles";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";
import HorizontalNumberPicker from "../components/HorizontalNumberPicker";
import { useTheme } from "react-native-paper";
import Button from "../components/Button";
import { DTComponent } from "../components/DTComponent";
import WidgetMapView from "../components/WidgetMapView";

function ConfirmTripScreen({ navigation, route }) {
	const { mapData } = route.params;
	const { user } = useContext(AppContext);
	const { colors } = useTheme();
	const [date, setDate] = useState(new Date(Date.now()));

	const [capacity, setCapacity] = useState(1);

	const polyline = mapData.routes[0].overview_polyline.points;

	const handlePress = () => {
		const tripData = {
			polyline: polyline,
			departureTime: date.toUTCString(),
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
				navigation.navigate("Crear viaje");
				navigation.navigate("Viajes activos");
				navigation.navigate("Detalle de viaje", { trip: tripData });
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};
	const onDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	return (
		<View style={styles.container}>
			<WidgetMapView
				polyline={polyline}
				navigation={navigation}
				passengerCoordinates={[]}
			/>
			<View
				style={{
					marginVertical: 20,
					width: "100%",
				}}
			>
				<DTComponent onChange={onDateChange} date={date} />
			</View>
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
