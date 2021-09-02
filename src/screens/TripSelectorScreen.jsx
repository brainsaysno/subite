import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { List } from "react-native-paper";
import TripListComponent from "../components/TripListComponent";

function TripSelectorScreen(props) {
  const [tripListComponents, setTripListComponents] = useState([]);
  const data = [
    { driverName: "Pepe", arrivalTime: "9:00", passengerCount: 1, capacity: 4 },
    {
      driverName: "Aleman",
      arrivalTime: "6:69",
      passengerCount: 2,
      capacity: 3,
    },
    {
      driverName: "Guzman",
      arrivalTime: "4:20",
      passengerCount: 2,
      capacity: 5,
    },
    { driverName: "Feli", arrivalTime: "4:40", passengerCount: 0, capacity: 3 },
    {
      driverName: "Cande",
      arrivalTime: "6:35",
      passengerCount: 0,
      capacity: 2,
    },
    {
      driverName: "Tami",
      arrivalTime: "18:32",
      passengerCount: 0,
      capacity: 1,
    },
  ];
  useEffect(() => {
    const comps = data.map((trip, i) => (
      <TripListComponent trip={trip} key={i} navigation={props.navigation} />
    ));
    setTripListComponents(comps);
  }, []);
  return (
    <View>
      <List.Section>
        <List.Subheader>Hoy</List.Subheader>
        {tripListComponents}
      </List.Section>
    </View>
  );
}

export default TripSelectorScreen;
