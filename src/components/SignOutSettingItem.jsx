import React from "react";
import { DefaultTheme, List, Switch, useTheme } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../../config/firebase";

function SignOutSettingItem() {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			onPress={() => {
				auth.signOut();
				console.log("Signing out");
			}}
			activeOpacity={1}
		>
			<List.Item
				title="Sign Out"
				left={() => (
					<List.Icon
						icon="web"
						style={{
							backgroundColor: colors.primary,
							...itemStyles.icon,
						}}
						color={colors.background}
					/>
				)}
				right={() => <List.Icon icon="chevron-right" />}
				style={{
					borderBottomColor: "grey",
					borderBottomWidth: 1,
					borderStyle: "solid",
				}}
			/>
		</TouchableOpacity>
	);
}

const itemStyles = StyleSheet.create({
	icon: {
		borderRadius: 10,
	},
	container: {
		flex: 1,
		alignItems: "flex-end",
		justifyContent: "center",
		padding: 7.5,
	},
});

export default SignOutSettingItem;
