import * as React from "react";
import { BottomNavigation, Text, useTheme } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import styles from "../styles.js";
import CreateTripScreen from "../screens/CreateTripScreen";
import ProfileNavigator from "../screens/ProfileScreen";
import CreateTripNavigation from "../screens/CreateTripStack.jsx";

const TestRoute = () => {
  return (
    <View style={styles.container}>
      <Text>alisdlasidlaihsdl</Text>
    </View>
  );
};

const BottomNavbar = ({ darkModeToggle }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "test", title: "Test", icon: "crosshairs-question" },
    { key: "createTrip", title: "Create Trip", icon: "map-outline" },
    { key: "profile", title: "Profile", icon: "account" },
  ]);

  // ICONS FROM MATERIAL DESIGN https://materialdesignicons.com/

  const renderScene = BottomNavigation.SceneMap({
    test: TestRoute,
    createTrip: CreateTripNavigation,
    profile() {
      return <ProfileNavigator darkModeToggle={darkModeToggle} />;
    },
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavbar;
