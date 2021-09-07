import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Lorem Ipsum</Header>

    <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing.</Paragraph>
    <Button
      mode="contained"
      onPress={() => navigation.navigate("Login", { isDriver: true })}
    >
      Driver
    </Button>
    <Button
      mode="contained"
      onPress={() => navigation.navigate("Login", { isDriver: false })}
    >
      Passenger
    </Button>
  </Background>
);

export default memo(HomeScreen);
