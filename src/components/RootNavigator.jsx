import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar as StatBar } from "expo-status-bar";
import PassengerNavigator from "./PassengerNavigator";
import DriverNavigator from "./DriverNavigator";
import LoginStack from "./stacks/LoginStack";
import { AppContext } from "../../navigation/AppProvider";
import { auth, db } from "../../config/firebase";

import {
	DefaultTheme as PaperDefaultTheme,
	DarkTheme as PaperDarkTheme,
	Provider as PaperProvider,
	useTheme,
	ActivityIndicator,
} from "react-native-paper";
import {
	NavigationContainer,
	DefaultTheme as NavigationDefaultTheme,
	DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

const CombinedDefaultTheme = {
	...PaperDefaultTheme,
	...NavigationDefaultTheme,
	colors: {
		text: "tomato",
		...PaperDefaultTheme.colors,
		...NavigationDefaultTheme.colors,
	},
};
const CombinedDarkTheme = {
	...PaperDarkTheme,
	...NavigationDarkTheme,
	colors: {
		...PaperDarkTheme.colors,
		...NavigationDarkTheme.colors,
	},
};

function RootNavigator() {
	const { dark } = useTheme();
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthed, setIsAuthed] = useState(false);
	const { isDriver, setUser, usingDarkMode } = useContext(AppContext);

	function onAuthStateChanged(authenticatedUser) {
		if (authenticatedUser) {
			db.collection("users")
				.doc(authenticatedUser.uid)
				.get()
				.then((doc) => {
					if (doc.exists) {
						setIsAuthed(true);
						setUser({
							uid: doc.id,
							...doc.data(),
						});
						console.log("User data: ", doc.data());
					} else {
						// Sign out for security reasons... this should never happen for legitimate users
						auth.signOut();
					}
				});
			console.log(authenticatedUser.uid);
		} else {
			setUser(undefined);
			setIsAuthed(false);
		}

		setIsLoading(false);
	}

	useEffect(() => {
		const unsubscribeAuth = auth.onAuthStateChanged(onAuthStateChanged);
		return unsubscribeAuth;
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<PaperProvider
			theme={usingDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
		>
			<NavigationContainer
				theme={usingDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
			>
				{isAuthed ? (
					isDriver ? (
						<DriverNavigator />
					) : (
						<PassengerNavigator />
					)
				) : (
					<LoginStack />
				)}
				<StatBar style={dark ? "light" : "dark"} />
			</NavigationContainer>
		</PaperProvider>
	);
}

export default RootNavigator;
