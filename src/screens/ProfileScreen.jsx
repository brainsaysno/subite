import React from "react";
import { View, Text, Settings, StyleSheet, StatusBar } from "react-native";
import { List, useTheme } from "react-native-paper";
import DarkModeToggleItem from "../components/DarkModeToggleItem";
import ChevronSettingItem from "../components/ChevronSettingItem";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DefaultScreen from "./DefaultScreen";
import SignOutSettingItem from "../components/SignOutSettingItem";

const Stack = createNativeStackNavigator();

function ProfileScreen(props) {
	return (
		<View>
			<List.Section>
				<List.Subheader>Account</List.Subheader>
				<DarkModeToggleItem />
				<ChevronSettingItem {...props} />
				<ChevronSettingItem {...props} />
				<SignOutSettingItem />
			</List.Section>
		</View>
	);
}

function ProfileNavigation(props) {
	return (
		<Stack.Navigator initialRouteName="Profile Settings">
			<Stack.Screen name="Profile Settings" component={ProfileScreen} />
			<Stack.Screen name="Default Screen">
				{() => <DefaultScreen {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}

export default ProfileNavigation;
