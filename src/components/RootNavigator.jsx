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
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadState, setReloadState] = useState(null);

  const [isDriver, setIsDriver] = useState(null);

  function onAuthStateChanged(authenticatedUser) {
    authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    setIsLoading(false);
    console.log(authenticatedUser ? "yes" : "no");
  }

  useEffect(() => {
    console.log(user);
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
      {user ? (
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
