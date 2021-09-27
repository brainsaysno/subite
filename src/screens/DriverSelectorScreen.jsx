import React, { memo, useContext } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import { AppContext } from "../../navigation/AppProvider";
import { Button } from "react-native";

function HomeScreen({ navigation }) {
	const { setIsDriver } = useContext(AppContext);

	return (
		<Background>
			<Logo />
			<Header>Subite</Header>

			<Button
				mode="contained"
				onPress={() => {
					setIsDriver(true);
					navigation.navigate("Login");
				}}
				title="Conductor"
			></Button>
			<Button
				mode="contained"
				onPress={() => {
					setIsDriver(false);
					navigation.navigate("Login");
				}}
				title="Pasajero"
			></Button>
		</Background>
	);
}

export default HomeScreen;
