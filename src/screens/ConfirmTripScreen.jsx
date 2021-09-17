import React, { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/Button";
import styles from "../styles";

function ConfirmTripScreen({ navigation, route }) {
  const { tripData } = route.params;

  const [capacity, setCapacity] = useState();

  return (
    <View style={styles.container}>
      <Text>{tripData.routes[0].overview_polyline.points}</Text>
      <Picker
        selectedValue={capacity}
        onValueChange={(itemVal, itemIndex) => setCapacity(itemVal)}
      >
        <Picker.Item label="1" value={1} />
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
      </Picker>

      <Button>Heyoh</Button>
    </View>
  );
}

export default ConfirmTripScreen;
