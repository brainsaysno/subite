import React from "react";
import { Image, StyleSheet } from "react-native";

function Logo({ style }) {
  return (
    <Image
      source={require("../../assets/flat-icon.png")}
      style={{ ...styles.image, ...style }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 220,
    marginBottom: 12,
  },
});

export default Logo;
