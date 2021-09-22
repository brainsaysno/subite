import React, { useContext } from "react";
import { View, Text, Settings, StyleSheet, StatusBar } from "react-native";
import { List, useTheme } from "react-native-paper";
import DarkModeToggleItem from "../components/DarkModeToggleItem";
import ChevronSettingItem from "../components/ChevronSettingItem";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DefaultScreen from "./DefaultScreen";
import SignOutSettingItem from "../components/SignOutSettingItem";
import SetRadiusScreen from "./SetRadiusScreen";
import { AppContext } from "../../navigation/AppProvider";
import ToggleSettingItem from "../components/DarkModeToggleItem";

const Stack = createNativeStackNavigator();

function ProfileScreen({ navigation }) {
	const { usingDarkMode, setUsingDarkMode, isDriver, setIsDriver } =
		useContext(AppContext);

	const toggleDarkMode = () => setUsingDarkMode(!usingDarkMode);
	const toggleIsDriver = () => setIsDriver(!isDriver);

	const DarkModeToggleItem = () => (
		<ToggleSettingItem
			title="Dark Mode"
			value={usingDarkMode}
			onToggle={toggleDarkMode}
			icon={usingDarkMode ? "brightness-2" : "brightness-7"}
		/>
	);

	const DriverToggleItem = () => (
		<ToggleSettingItem
			title="Driver"
			value={isDriver}
			onToggle={toggleIsDriver}
			icon="steering"
		/>
	);

	if (isDriver)
		return (
			<View>
				<List.Section>
					<List.Subheader style={profileStyles.subheader}>
						Account
					</List.Subheader>
					<DarkModeToggleItem />
					<DriverToggleItem />
					<ChevronSettingItem navigation={navigation} />
				</List.Section>
				<List.Section>
					<List.Subheader style={profileStyles.subheader}>
						Another Section
					</List.Subheader>
					<SignOutSettingItem />
				</List.Section>
			</View>
		);
	return (
		<View>
			<List.Section>
				<List.Subheader style={profileStyles.subheader}>Account</List.Subheader>
				<DarkModeToggleItem />
				<DriverToggleItem />
				<ChevronSettingItem
					navigation={navigation}
					title="Set radius"
					icon="android-studio"
					screenName="Set Radius"
				/>
				<ChevronSettingItem navigation={navigation} />
			</List.Section>
			<List.Section>
				<List.Subheader style={profileStyles.subheader}>
					Another Section
				</List.Subheader>
				<SignOutSettingItem />
			</List.Section>
		</View>
	);
}

function ProfileNavigation(props) {
	return (
		<Stack.Navigator initialRouteName="Profile Settings">
			<Stack.Screen name="Profile Settings" component={ProfileScreen} />
			<Stack.Screen name="Set Radius" component={SetRadiusScreen} />
			<Stack.Screen name="Default Screen" component={DefaultScreen} />
		</Stack.Navigator>
	);
}

export default ProfileNavigation;

const profileStyles = StyleSheet.create({
	subheader: {
		borderBottomColor: "grey",
		borderBottomWidth: 1,
		borderStyle: "solid",
	},
});
