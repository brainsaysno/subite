import React from "react";
import { Button, Text, View } from "react-native";
import styles from "../styles";

function NotAuthedScreen() {
  const handlePress = () => {
    return null;
  };
  return (
    <View style={styles.container}>
      <Text>Not Authed</Text>

      <Button title="Sign In" onPress={handlePress}></Button>
    </View>
  );
}

export default NotAuthedScreen;
