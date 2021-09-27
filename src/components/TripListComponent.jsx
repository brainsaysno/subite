import React, { useEffect } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-eva-icons";
import { List, useTheme } from "react-native-paper";
import styles from "../styles";

function TripListComponent({
	trip,
	navigation,
	passengerCoordinates,
	confirmNavigate,
}) {
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			onPress={() => {
				confirmNavigate === true
					? navigation.navigate("Confirm Trip Detail", {
							trip: trip,
							passengerCoordinates: passengerCoordinates,
					  })
					: navigation.navigate("Trip Detail", {
							trip: trip,
							passengerCoordinates: passengerCoordinates,
					  });
			}}
		>
			<List.Item
				// TODO: Decide on fullName vs firstName
				title={trip.driver.fullName /* .split(" ")[0] */}
				// TODO: Add moment.js dates. See issue #8 https://github.com/VendedorDeWards/subite/issues/8
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
