import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styles from "../styles";

const Loading = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" />
		</View>
	);
};

export default Loading;
