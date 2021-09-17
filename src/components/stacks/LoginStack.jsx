import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/LoginScreen";
import DriverSelectorScreen from "../../screens/DriverSelectorScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import ForgotPasswordScreen from "../../screens/ForgotPasswordScreen";
import DriverNavigator from "../DriverNavigator";
import PassengerNavigator from "../PassengerNavigator";

const Stack = createNativeStackNavigator();

function LoginStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Driver Selector"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Driver Selector" component={DriverSelectorScreen} />
      <Stack.Screen name="Login">
        {(navProps) => (
          <LoginScreen {...navProps} setIsDriver={props.setIsDriver} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {(navProps) => (
          <RegisterScreen {...navProps} setIsDriver={props.setIsDriver} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

export default LoginStack;
