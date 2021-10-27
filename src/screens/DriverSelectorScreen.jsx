import React, { memo, useContext } from "react";
import KeyboardAvoidingCustom from "../components/KeyboardAvoidingCustom";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import { AppContext } from "../../navigation/AppProvider";
import Button from "../components/Button";
import { Dimensions, View } from "react-native";
import { useTheme } from "react-native-paper";
function HomeScreen({ navigation }) {
  const { setIsDriver } = useContext(AppContext);
  const { colors } = useTheme();

  return (
    <KeyboardAvoidingCustom>
      <Logo />
      <Button
        mode="contained"
        onPress={() => {
          setIsDriver(true);
          navigation.navigate("Login");
        }}
      >
        Conductor
      </Button>
      <Button
        mode="contained"
        color={colors.blue}
        onPress={() => {
          setIsDriver(false);
          navigation.navigate("Login");
        }}
      >
        Pasajero
      </Button>
    </KeyboardAvoidingCustom>
  );
}

export default HomeScreen;
