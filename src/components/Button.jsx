import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { useTheme } from "react-native-paper";

function Button({ style, children, ...props }) {
  const { colors } = useTheme();
  return (
    <PaperButton
      style={{
        ...styles.button,
        ...style,
      }}
      labelStyle={styles.text}
      {...props}
    >
      {children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 26,
  },
});

export default Button;
