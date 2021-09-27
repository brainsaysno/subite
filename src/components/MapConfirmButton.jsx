import React from "react";
import { View, Button } from "react-native";

export default function MapConfirmButton({ navigation, mapData, screenName }) {
	return (
		<View
			style={{
				position: "absolute",
				bottom: 20,
				left: 0,
				right: 0,
				marginRight: "auto",
				marginLeft: "auto",
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Button
				title="Me gusta"
				onPress={() => {
					navigation.navigate(screenName, {
						mapData: mapData,
					});
				}}
			/>
		</View>
	);
}
