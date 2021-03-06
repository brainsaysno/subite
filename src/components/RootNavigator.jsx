import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import PassengerNavigator from "./PassengerNavigator";
import DriverNavigator from "./DriverNavigator";
import LoginStack from "./stacks/LoginStack";
import { AppContext } from "../../navigation/AppProvider";
import { auth, db } from "../../config/firebase";

import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import AppLoading from "../screens/AppLoading";

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  fonts: {
    ...PaperDefaultTheme.fonts,
    ...NavigationDefaultTheme.fonts,
    /* regular: {
			fontFamily: "Gill Sans",
			fontWeight: "300",
		},
		medium: {
			fontFamily: "Gill Sans",
			fontWeight: "400",
		},
		light: {
			fontFamily: "Gill Sans",
			fontWeight: "400",
		}, */
  },

  /* https://coolors.co/e6594c-689bf3-ffc247-81c596-95a8b1 */

  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: "#e6594c",
    blue: "#689bf3",
    yellow: "#FFC247",
    surface: "#e4e4e4",
    green: "#81C596",
    dbackground: "#173b66",
    /* error: "red", */
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};
function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const { isDriver, setUser, usingDarkMode } = useContext(AppContext);

  function onAuthStateChanged(authenticatedUser) {
    if (authenticatedUser) {
      db.collection("users")
        .doc(authenticatedUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUser({
              ...doc.data(),
              uid: doc.id,
            });
            setIsAuthed(true);
            setIsLoading(false);
          } else {
            // Sign out for security reasons... this should never happen for legitimate users
            auth.signOut();
          }
        });
    } else {
      setIsAuthed(false);
      setUser(null);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(onAuthStateChanged);
    return unsubscribeAuth;
  }, []);

  return (
    <PaperProvider
      theme={usingDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
    >
      <NavigationContainer
        theme={usingDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}
      >
        {isLoading ? (
          <AppLoading />
        ) : isAuthed ? (
          isDriver ? (
            <DriverNavigator />
          ) : (
            <PassengerNavigator />
          )
        ) : (
          <LoginStack />
        )}
        <StatusBar style={"light"} />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default RootNavigator;
