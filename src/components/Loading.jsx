import React from "react";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styles from "../styles";

function Loading() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" />
		</View>
	);
}

export default Loading;
