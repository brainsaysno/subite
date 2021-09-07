import React from "react";
import { DefaultTheme, List, Switch, useTheme } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../styles";
import DefaultScreen from "../screens/DefaultScreen";

const ChevronSettingItem = ({
  title = "Setting",
  icon = "web",
  iconColor,
  screenName,
}) => {
  const { colors } = useTheme();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    onToggle();
  };
  return (
    <TouchableOpacity onPress={onToggleSwitch} activeOpacity={1}>
      <List.Item
        title={title}
        left={() => (
          <Lis.Icon
            icon={icon}
            syle={{
              backgroundColor: iconColor ? iconColor : colors.primary,
              ...itemStyles.icon,
            }}
            color={colors.background}
          />
        )}
        right={
          toggle
            ? () => (
                <View style={itemStyles.container}>
                  <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </View>
              )
            : null
        }
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

export default SettingsItem;
