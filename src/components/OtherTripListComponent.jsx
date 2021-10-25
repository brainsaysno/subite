import moment from "moment";
import React, { useEffect } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-eva-icons";
import { List, useTheme } from "react-native-paper";
import styles from "../styles";

function OtherTripListComponent({
	trip,
	userCoordinates,
	navigation,
	confirmNavigate,
}) {
	const { colors } = useTheme();

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate(
					confirmNavigate === true ? "Resumen del viaje" : "Detalle de viaje",
					{
						trip: trip,
						userCoordinates: userCoordinates,
					}
				);
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
							display: "flex",
							width: 70,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ color: colors.text, fontSize: 24 }}>
							{moment(trip.departureTime).format("DD/MM")}
						</Text>
						<Text style={{ color: colors.text, fontSize: 16 }}>
							{moment(trip.departureTime).format("HH:mm")}
						</Text>
					</View>
				)}
				right={() => <List.Icon icon="chevron-right" />}
			></List.Item>
		</TouchableOpacity>
	);
}

export default OtherTripListComponent;
