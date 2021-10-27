import React from "react";
import { List, useTheme } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";

function ChevronSettingItem({
  title = "Setting",
  icon = "web",
  iconColor,
  onPress,
}) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <List.Item
        title={title}
        left={() => (
          <List.Icon
            icon={icon}
            style={{
              backgroundColor: iconColor ? iconColor : colors.primary,
              ...itemStyles.icon,
            }}
            color={colors.background}
          />
        )}
        right={() => <List.Icon icon="chevron-right" />}
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 0.5,
          borderStyle: "solid",
        }}
      />
    </TouchableOpacity>
  );
}

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
