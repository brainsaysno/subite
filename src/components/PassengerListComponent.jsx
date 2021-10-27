import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Icon } from "react-native-eva-icons";
import { useTheme } from "react-native-paper";

function PassengerListComponent({ passenger }) {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			onPress={() => Linking.openURL(`https://wa.me/598${passenger.phone}`)}
			style={{
				backgroundColor: colors.green,
				width: "100%",
				paddingVertical: 10,
				paddingHorizontal: 20,
				minHeight: 50,
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				marginBottom: 5,
			}}
		>
			<Text style={{ fontSize: 15 }}>{passenger.fullName}</Text>
			<Icon
				name="message-circle-outline"
				width={20}
				height={20}
				fill={colors.background}
			/>
		</TouchableOpacity>
	);
}

export default PassengerListComponent;
