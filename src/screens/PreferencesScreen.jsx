import React, { useContext } from "react";
import { View, Text, Settings, StyleSheet, StatusBar } from "react-native";
import { List, useTheme } from "react-native-paper";
import ChevronSettingItem from "../components/ChevronSettingItem";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreen from "./DefaultScreen";
import SetRadiusScreen from "./SetRadiusScreen";
import { AppContext } from "../../navigation/AppProvider";
import ToggleSettingItem from "../components/ToggleSettingItem";
import AccountData from "./AccountData";
import AboutUs from "./AboutUs";
import { auth } from "../../config/firebase";

const Stack = createNativeStackNavigator();

function PreferencesScreen({ navigation }) {
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
					title="Mi cuenta"
					icon="account"
					iconColor={colors.onSurface}
					onPress={() => navigation.navigate("Mi cuenta")}
				/>
			</List.Section>
			<List.Section>
				<List.Subheader>Otros ajustes</List.Subheader>
				{isDriver ? null : (
					<ChevronSettingItem
						title="Ajustar radio"
						icon="android-studio"
						onPress={() => navigation.navigate("Ajustar radio")}
					/>
				)}
				<DriverToggleItem />
				<ChevronSettingItem
					title="Sobre nosotros"
					icon="information-outline"
					iconColor={colors.error}
					onPress={() => navigation.navigate("Sobre nosotros")}
				/>
				<ChevronSettingItem
					title="Cerrar Sesión"
					icon="logout"
					onPress={() => auth.signOut()}
				/>
			</List.Section>
		</View>
	);
}

function PreferencesNavigator() {
	return (
		<Stack.Navigator initialRouteName="Preferencias">
			{/* Preferencias */}
			<Stack.Screen name="Preferencias" component={PreferencesScreen} />
			{/* Ajustar radio */}
			<Stack.Screen name="Ajustar radio" component={SetRadiusScreen} />
			<Stack.Screen name="Mi cuenta" component={AccountData} />
			<Stack.Screen name="Sobre nosotros" component={AboutUs} />
			<Stack.Screen name="Default Screen" component={DefaultScreen} />
		</Stack.Navigator>
	);
}

export default PreferencesNavigator;