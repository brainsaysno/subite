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

  // TODO: Get available radius from settings https://github.com/VendedorDeWards/subite/issues/5
  const availableRadius = 2;

  //const tripsRef = collection(db, "trips");
  useEffect(() => {
    /*
    const querySnapshot = getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    }); */

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
