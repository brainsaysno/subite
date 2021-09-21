import "react-native-gesture-handler";
import React from "react";
import { AppProvider } from "./navigation/AppProvider";
import RootNavigator from "./src/components/RootNavigator";

export default function App() {
	return (
		<AppProvider>
			<RootNavigator />
		</AppProvider>
	);
}
