import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { List } from "react-native-paper";
import TripListComponent from "../components/TripListComponent";
import { latitudeToKm } from "../core/utils";
import { collection, doc, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";

import { tripData } from "../../dummy";

function TripSelectorScreen({ navigation }) {
  const [tripListComponents, setTripListComponents] = useState([]);


  const availableRadius = 2;

  //const tripsRef = collection(db, "trips");
  useEffect(() => {

    const comps = tripData.map((trip, i) => (
      <TripListComponent trip={trip} key={i} navigation={navigation} />
    ));
    setTripListComponents(comps);
  }, []);
  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Hoy</List.Subheader>
        {tripListComponents}
      </List.Section>
    </ScrollView>
  );
}

export default TripSelectorScreen;
