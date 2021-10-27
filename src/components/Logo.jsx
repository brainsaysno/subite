import React from "react";
import { Image, StyleSheet } from "react-native";

function Logo({ style }) {
	return (
		<Image
			source={require("../../assets/icon.png")}
			style={{ ...styles.image, ...style }}
		/>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 256,
		height: 256,
		marginBottom: 12,
	},
});

export default Logo;
