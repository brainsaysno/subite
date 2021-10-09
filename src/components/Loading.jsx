import React from "react";
import { useContext } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";

function Loading() {
	const { colors } = useTheme();
	return (
		<View style={styles.container}>
			<Text style={{ color: colors.primary, fontSize: 40, fontWeight: "bold" }}>
				Subite
			</Text>
			<ActivityIndicator size="small" style={{ marginTop: 20 }} />
		</View>
	);
}

export default Loading;
