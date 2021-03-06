import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("screen").height,
	},
});

export default styles;
