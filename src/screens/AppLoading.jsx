import React from "react";
import { useContext } from "react";
import { View, Image } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";

function AppLoading() {
	const { colors } = useTheme();
	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/horizontal-icon.png")}
				style={{ height: 180, width: 256 }}
			/>
			<ActivityIndicator size="large" style={{ marginTop: 20 }} />
		</View>
	);
}

export default AppLoading;
