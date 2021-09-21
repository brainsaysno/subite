import React, { useContext } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { AppContext } from "../../navigation/AppProvider";

function DefaultScreen() {
	const { colors } = useTheme();
	const { isDriver, user } = useContext(AppContext);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ color: colors.text }}>Hey, test here!</Text>
			{user ? (
				<>
					<Text style={{ color: colors.text }}>
						You are a {isDriver ? "driver!" : "passenger!"}
					</Text>
					<Text style={{ color: colors.text }}>
						Currently signed in as {user.email}
					</Text>
				</>
			) : (
				<Text style={{ color: colors.text }}>You're not signed in yet!</Text>
			)}
		</View>
	);
}

export default DefaultScreen;
