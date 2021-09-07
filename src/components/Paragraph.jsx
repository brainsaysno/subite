import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

function Paragraph({ children }) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontSize: 16,
      lineHeight: 26,
      color: colors.secondary,
      textAlign: "center",
      marginBottom: 14,
    },
  });
  return <Text style={styles.text}>{children}</Text>;
}

export default Paragraph;
