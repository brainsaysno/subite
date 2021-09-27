import React, { useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, Linking } from "react-native";
import styles from "../styles";
import { Button, useTheme } from "react-native-paper";
import WidgetMapView from "../components/WidgetMapView";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";
import { Icon } from "react-native-eva-icons";

function TripDetailScreen({ navigation, route }) {
	const { trip, passengerCoordinates } = route.params;
	const { colors } = useTheme();

	const message = "Whatsapp test message";

	return (
		<View style={styles.container}>
			<Text
				style={{
					fontWeight: "500",
					fontSize: 30,
					color: colors.text,
					textAlign: "center",
				}}
			>
				Driver name: {trip.driver.fullName}
			</Text>
			<Text
				style={{
					fontStyle: "italic",
					fontWeight: "300",
					fontSize: 20,
					color: colors.text,
					textAlign: "center",
				}}
			>
				Departure Time: {new Date(trip.departureTime).getDate().toString()}
				{", "}
				{new Date(trip.departureTime).getHours().toString()}:
				{new Date(trip.departureTime).getMinutes().toString()}
			</Text>
			<Text
				style={{ fontStyle: "italic", fontWeight: "200", color: colors.text }}
			>
				Capacity: {trip.passengerCount}/{trip.capacity}
			</Text>
			<WidgetMapView
				polyline={trip.polyline}
				navigation={navigation}
				passengerCoordinates={passengerCoordinates}
			/>
			<TouchableOpacity
				style={{
					display: "flex",
					flexDirection: "row",
				}}
				onPress={() =>
					Linking.openURL(
						`https://wa.me/598${trip.driver.phone}?text=${encodeURIComponent(
							message
						)}`
					)
				}
			>
				<Icon
					name="message-circle-outline"
					width={20}
					height={20}
					fill={colors.error}
					style={{ marginRight: 2 }}
				/>
				<Text
					style={{
						color: colors.error,
					}}
				>
					Whatsapp driver!
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default TripDetailScreen;
