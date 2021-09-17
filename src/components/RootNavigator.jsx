import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar as StatBar } from "expo-status-bar";
import { ActivityIndicator, useTheme } from "react-native-paper";
import PassengerNavigator from "./PassengerNavigator";
import DriverNavigator from "./DriverNavigator";
import LoginStack from "./stacks/LoginStack";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import Firebase from "../../config/firebase";
import { NavigationContainer } from "@react-navigation/native";

const auth = Firebase.auth();

function RootNavigator({ darkModeToggle }) {
  const { dark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [isDriver, setIsDriver] = useState(true);

  function onAuthStateChanged(authenticatedUser) {
    if (authenticatedUser) {
      setIsAuthed(true);
      console.log(authenticatedUser.uid);
    } else {
      setIsAuthed(false);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(onAuthStateChanged);
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {isAuthed ? (
        isDriver ? (
          <DriverNavigator
            darkModeToggle={darkModeToggle}
            isDriver={isDriver}
          />
        ) : (
          <PassengerNavigator
            darkModeToggle={darkModeToggle}
            isDriver={isDriver}
          />
        )
      ) : (
        <LoginStack setIsDriver={setIsDriver} />
      )}
      <StatBar style={dark ? "light" : "dark"} />
    </>
  );
}

export default RootNavigator;
