import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles";
import firebase from "firebase";
import { db } from "../../config/firebase";

function ConfirmTripScreen({ navigation, route }) {
  const { tripData } = route.params;

  const [capacity, setCapacity] = useState();

  const [newTripData, setNewTripData] = useState({
    polyline: tripData.routes[0].overview_polyline.points,
    departureTime: Date.now(),
    capacity: 3,
    driver: db.doc("users/" + firebase.auth().currentUser.uid),
    institutionID: "ort",
    passengerCount: 0,
  });

  const handlePress = () => {
    db.collection("trips")
      .add(newTripData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        navigation.navigate("Trip Success", { docID: docRef.id });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>{tripData.routes[0].overview_polyline.points}</Text>

      <Button title={"DEV Confirm"} onPress={handlePress}></Button>
    </View>
  );
}

export default ConfirmTripScreen;
