import React from "react";
import { useContext } from "react";
import { View, Text } from "react-native";
import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";

function AccountData() {
	const { user } = useContext(AppContext);

	return (
		<View style={styles.container}>
			<Text>{user.fullName}</Text>
			<Text>{user.email}</Text>
		</View>
	);
}

export default AccountData;
