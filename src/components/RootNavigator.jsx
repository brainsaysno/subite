import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar as StatBar } from "expo-status-bar";
import { ActivityIndicator, useTheme } from "react-native-paper";
import PassengerNavigator from "./PassengerNavigator";
import DriverNavigator from "./DriverNavigator";
import LoginStack from "./stacks/LoginStack";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import { auth, db } from "../../config/firebase";
import { NavigationContainer } from "@react-navigation/native";

function RootNavigator({ darkModeToggle }) {
	const { dark } = useTheme();
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthed, setIsAuthed] = useState(false);
	const { isDriver, setUser } = useContext(AuthenticatedUserContext);

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
		<>
			{isAuthed ? (
				isDriver ? (
					<DriverNavigator darkModeToggle={darkModeToggle} />
				) : (
					<PassengerNavigator darkModeToggle={darkModeToggle} />
				)
			) : (
				<LoginStack />
			)}
			<StatBar style={dark ? "light" : "dark"} />
		</>
	);
}

export default RootNavigator;
