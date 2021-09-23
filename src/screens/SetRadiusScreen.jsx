import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";
import { Icon } from "react-native-eva-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../../config/firebase";

function SetRadiusScreen({ navigation }) {
	const { colors } = useTheme();
	const { user, setUser } = useContext(AppContext);
	const [radius, setRadius] = useState(user.radius ? user.radius : 1);
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => setRadius(radius + 1)}>
				<Icon
					name={"arrow-ios-upward-outline"}
					width={100}
					height={100}
					fill={colors.primary}
				/>
			</TouchableOpacity>
			<Text style={{ color: colors.text }}>{radius} kms</Text>
			<TouchableOpacity
				onPress={() => (radius == 1 ? null : setRadius(radius - 1))}
			>
				<Icon
					name={"arrow-ios-downward-outline"}
					width={100}
					height={100}
					fill={colors.primary}
				/>
			</TouchableOpacity>
			<Button
				style={{ backgroundColor: colors.primary }}
				labelStyle={{ color: colors.text }}
				onPress={() => {
					db.collection("users").doc(user.uid).update({
						radius: radius,
					});
					setUser({
						...user,
						radius: radius,
					});
					navigation.goBack();
					navigation.navigate("Join Trip");
				}}
			>
				Ok!
			</Button>
		</View>
	);
}

export default SetRadiusScreen;
