import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";

function JoinTripSuccessScreen({ route }) {
	const { trip } = route.params;
	return (
		<View style={styles.container}>
			<Text>You joined {trip.driver.fullName}'s trip successfully!</Text>
		</View>
	);
}

export default JoinTripSuccessScreen;
