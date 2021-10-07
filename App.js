import "react-native-gesture-handler";
import React from "react";
import { AppProvider } from "./navigation/AppProvider";
import RootNavigator from "./src/components/RootNavigator";
import { Dimensions } from "react-native";

export default function App() {
	return (
		<AppProvider>
			<RootNavigator
				style={{
					width: Dimensions.get("window").width,
					height: Dimensions.get("window").height,
				}}
			/>
		</AppProvider>
	);
}
