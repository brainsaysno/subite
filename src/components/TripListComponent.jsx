import React, { useEffect } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-eva-icons";
import { List, useTheme } from "react-native-paper";
import styles from "../styles";

function TripListComponent({ trip, navigation }) {
	const { colors } = useTheme();

	useEffect(() => {
		console.log(trip);
	}, []);

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("Trip Detail", {
					trip: trip,
				});
			}}
		>
			<List.Item
				// TODO: Decide on fullName vs firstName
				title={trip.driver.fullName /* .split(" ")[0] */}
				description={
					trip.passengerCount.toString() + "/" + trip.capacity.toString()
				}
				//TODO: Fix styles
				left={() => (
					<View
						style={{
							width: 70,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ color: colors.text, fontSize: 25 }}>
							{new Date(trip.departureTime).getHours().toString()}:
							{new Date(trip.departureTime).getMinutes().toString()}
						</Text>
					</View>
				)}
				right={() => <List.Icon icon="chevron-right" />}
			></List.Item>
		</TouchableOpacity>
	);
}

export default TripListComponent;
