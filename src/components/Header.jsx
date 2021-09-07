import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

function Header({ children }) {
  const { colors } = useTheme();
  return (
    <Text style={{ color: colors.primary, ...styles.header }}>{children}</Text>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: "bold",
    paddingVertical: 14,
  },
});

export default Header;
