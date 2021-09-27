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
import AccountData from "../screens/AccountData";
import AboutUs from "../screens/AboutUs";

const Stack = createNativeStackNavigator();

function ProfileScreen({ navigation }) {
	const { usingDarkMode, setUsingDarkMode, isDriver, setIsDriver } =
		useContext(AppContext);
	const { colors, fonts } = useTheme();

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
			title="Conductor"
			value={isDriver}
			onToggle={toggleIsDriver}
			icon="steering"
		/>
	);
	return (
		<View>
			<List.Section>
				<List.Subheader>Cuenta</List.Subheader>
				{/* 	<DarkModeToggleItem /> */}
				<ChevronSettingItem
					navigation={navigation}
					title="Mi cuenta"
					icon="account"
					iconColor={colors.onSurface}
					screenName="Mi cuenta"
				/>
			</List.Section>
			<List.Section>
				<List.Subheader>Otros ajustes</List.Subheader>
				{isDriver ? null : (
					<ChevronSettingItem
						navigation={navigation}
						title="Ajustar radio"
						icon="android-studio"
						screenName="Set Radius"
					/>
				)}
				<DriverToggleItem />
				<ChevronSettingItem
					navigation={navigation}
					title="Sobre nosotros"
					icon="information-outline"
					iconColor={colors.error}
					screenName="Sobre nosotros"
				/>
				<SignOutSettingItem />
			</List.Section>
		</View>
	);
}

function ProfileNavigation(props) {
	return (
		<Stack.Navigator initialRouteName="Profile Settings">
			{/* Preferencias */}
			<Stack.Screen name="Profile Settings" component={ProfileScreen} />
			{/* Ajustar radio */}
			<Stack.Screen name="Set Radius" component={SetRadiusScreen} />
			<Stack.Screen name="Mi cuenta" component={AccountData} />
			<Stack.Screen name="Sobre nosotros" component={AboutUs} />
			<Stack.Screen name="Default Screen" component={DefaultScreen} />
		</Stack.Navigator>
	);
}

export default ProfileNavigation;
