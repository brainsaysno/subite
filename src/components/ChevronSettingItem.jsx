import React from "react";
import { DefaultTheme, List, Switch, useTheme } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../styles";
import DefaultScreen from "../screens/DefaultScreen";

const ChevronSettingItem = ({
  title = "Setting",
  icon = "web",
  iconColor,
  screenName = "Default Screen",
  navigation,
}) => {
  console.log(navigation);
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screenName)}
      activeOpacity={1}
    >
      <List.Item
        title={title}
        left={() => (
          <List.Icon
            icon={icon}
            style={{
              backgroundColor: iconColor ? iconColor : colors.primary,
              ...itemStyles.icon,
            }}
            color={DefaultTheme.colors.background}
          />
        )}
        right={() => <List.Icon icon="chevron-right" />}
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

export default ChevronSettingItem;
