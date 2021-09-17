import React, { useContext } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import Firebase from "../../config/firebase";

const auth = Firebase.auth();

function DefaultScreen({ isDriver }) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.text }}>Hey, test here!</Text>
      {auth.currentUser ? (
        <>
          <Text style={{ color: colors.text }}>
            You are a {isDriver ? "driver!" : "passenger!"}
          </Text>
          <Text style={{ color: colors.text }}>
            Currently signed in as {auth.currentUser.email}
          </Text>
        </>
      ) : (
        <Text style={{ color: colors.text }}>You're not signed in yet!</Text>
      )}
    </View>
  );
}

export default DefaultScreen;
