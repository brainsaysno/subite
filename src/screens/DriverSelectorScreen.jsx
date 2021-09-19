import React, { memo, useContext } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";

function HomeScreen({ navigation }) {
	const { setIsDriver } = useContext(AuthenticatedUserContext);

	return (
		<Background>
			<Logo />
			<Header>Lorem Ipsum</Header>

			<Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing.</Paragraph>
			<Button
				mode="contained"
				onPress={() => {
					setIsDriver(true);
					navigation.navigate("Login");
				}}
			>
				Driver
			</Button>
			<Button
				mode="contained"
				onPress={() => {
					setIsDriver(false);
					navigation.navigate("Login");
				}}
			>
				Passenger
			</Button>
		</Background>
	);
}

export default HomeScreen;
