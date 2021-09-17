import React from "react";
import { Button, View, Text } from "react-native";
import styles from "../styles";

function CreateTripSuccessScreen({ navigation, route }) {
  const { docID } = route.params;

  return (
    <View style={styles.container}>
      <Text>Successfully created a trip!</Text>
      <Text>DEV: id is {docID}</Text>
      <Button
        title={"Go to trips"}
        onPress={() => {
          navigation.navigate("Map");
          navigation.navigate("Trips");
        }}
      ></Button>
    </View>
  );
}

export default CreateTripSuccessScreen;
