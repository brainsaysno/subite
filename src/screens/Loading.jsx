import React from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import styles from "../styles";

export const LoadingDriver = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export const LoadingPassenger = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.blue} />
    </View>
  );
};
