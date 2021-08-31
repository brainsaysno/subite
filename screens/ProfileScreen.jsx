import React from "react";
import { View, Text, Settings, StyleSheet, StatusBar } from "react-native";
import { List, useTheme } from "react-native-paper";
import DarkModeToggleItem from "../components/DarkModeToggleItem";
import ChevronSettingItem from "../components/ChevronSettingItem";
import styles from "../styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DefaultScreen from "./DefaultScreen";

const Stack = createNativeStackNavigator();

function ProfileScreen(props) {
  /* const { colors } = useTheme(); */

  console.log(props);
  return (
    <View style={profileStyles.padTop}>
      <List.Section>
        <List.Subheader /* style={{ backgroundColor: colors.surface }} */>
          Account
        </List.Subheader>
        <DarkModeToggleItem
          darkModeToggle={props.darkModeToggle}
        ></DarkModeToggleItem>
        <ChevronSettingItem {...props} />
      </List.Section>
    </View>
  );
}

function ProfileNavigation(props) {
  return (
    <Stack.Navigator initialRouteName="Profile Settings">
      <Stack.Screen name="Profile Settings">
        {(navProps) => (
          <ProfileScreen {...navProps} darkModeToggle={props.darkModeToggle} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Default Screen">
        {() => <DefaultScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default ProfileNavigation;

const profileStyles = StyleSheet.create({
  padTop: {
    paddingTop: StatusBar.currentHeight,
  },
});
