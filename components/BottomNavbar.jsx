import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import styles from "../styles.js";
import CreateTripPage from "../pages/CreateTripPage";
const TestRoute = () => (
  <View style={styles.container}>
    <Text>Test</Text>
  </View>
);

const ProfileRoute = () => (
  <View style={styles.container}>
    <Text>Profile</Text>
  </View>
);

const BottomNavbar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "test", title: "Test", icon: "crosshairs-question" },
    { key: "createTrip", title: "Create Trip", icon: "map-outline" },
    { key: "profile", title: "Profile", icon: "account" },
  ]);

  // ICONS FROM MATERIAL DESIGN https://materialdesignicons.com/

  const renderScene = BottomNavigation.SceneMap({
    test: TestRoute,
    createTrip: CreateTripPage,
    profile: ProfileRoute,
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
