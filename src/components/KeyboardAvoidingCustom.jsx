import React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";

function KeyboardAvoidingCustom({ children }) {
	return (
		<KeyboardAvoidingView style={styles.container}>
			{children}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		width: "100%",
		maxWidth: 340,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default KeyboardAvoidingCustom;
