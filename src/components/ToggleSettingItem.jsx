import React from "react";
import { List, Switch, useTheme } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";

function ToggleSettingItem({
  title = "Toggle Setting",
  value,
  onToggle,
  icon = "emoticon",
  iconColor,
}) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={1}>
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
        right={() => (
          <View style={itemStyles.container}>
            <Switch
              value={value}
              onValueChange={onToggle}
              thumbColor={"#f2f2f2"}
              trackColor={{
                false: colors.blue + "90",
                true: colors.primary + "90",
              }}
            />
          </View>
        )}
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
    justifyContent: "center",
    paddingRight: 7.5,
  },
});

export default ToggleSettingItem;
