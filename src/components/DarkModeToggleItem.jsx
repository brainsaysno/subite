import React from "react";
import { DefaultTheme, List, Switch, useTheme } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../styles";

const DarkModeToggleItem = ({ darkModeToggle }) => {
  console.log("Dark Mode Function: " + darkModeToggle);
  const { colors, dark } = useTheme();
  return (
    <TouchableOpacity onPress={darkModeToggle} activeOpacity={1}>
      <List.Item
        title="Dark Mode"
        left={() => (
          <List.Icon
            icon={dark ? "brightness-2" : "brightness-7"}
            style={{
              backgroundColor: colors.primary,
              ...itemStyles.icon,
            }}
            color={DefaultTheme.colors.background}
          />
        )}
        right={() => (
          <View style={itemStyles.container}>
            <Switch value={dark} onValueChange={darkModeToggle} />
          </View>
        )}
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          borderStyle: "solid",
        }}
      />
    </TouchableOpacity>
  );
};

const itemStyles = StyleSheet.create({
  icon: {
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 7.5,
  },
});

export default DarkModeToggleItem;
