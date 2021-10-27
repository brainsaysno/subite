import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { useTheme } from "react-native-paper";

function TextInput({ errorText, ...props }) {
	const { colors } = useTheme();
	const styles = StyleSheet.create({
		container: {
			width: "100%",
			marginVertical: 12,
		},
		input: {
			backgroundColor: colors.surface,
		},
		error: {
			fontSize: 14,
			color: colors.green,
			paddingHorizontal: 4,
			paddingTop: 4,
		},
	});
	return (
		<View style={styles.container}>
			<Input
				style={styles.input}
				selectionColor={colors.primary}
				underlineColor="transparent"
				mode="outlined"
				{...props}
			/>
			{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
		</View>
	);
}

export default TextInput;
