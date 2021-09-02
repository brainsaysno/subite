import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import styles from "../styles";
import { createUserAndPassword } from "firebase/auth";

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
