import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { List, useTheme } from "react-native-paper";
import { db } from "../../config/firebase";

import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";
import Button from "../components/Button";
import OtherTripListComponent from "../components/OtherTripListComponent";
import { LoadingPassenger } from "./Loading";
import { getUnixNow } from "../core/utils";

function RecentTripsScreen({ navigation }) {
  const [tripListComponents, setTripListComponents] = useState({
    active: [],
    recent: [],
  });
  const { user } = useContext(AppContext);
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const unsub = db
        .collection("trips")
        .where("passengerUids", "array-contains", user.uid)
        .onSnapshot((querySnapshot) => {
          const unixNow = getUnixNow();
          const data = querySnapshot.docs.map((doc) => doc.data());
          console.log(data);

          let activeComponents = data.filter(
            (trip) => trip.departureTime > unixNow
          );

          activeComponents.sort((a, b) => a.departureTime - b.departureTime);

          activeComponents = activeComponents.map((trip, i) => {
            return (
              <OtherTripListComponent
                trip={trip}
                key={i}
                navigation={navigation}
                passengerCoordinates={[
                  trip.passengerData.filter(
                    (pData) => pData.uid === user.uid
                  )[0].location,
                ].flat(10)}
              />
            );
          });

          let recentComponents = data.filter(
            (trip) => trip.departureTime < unixNow
          );

          recentComponents.sort((a, b) => b.departureTime - a.departureTime);

          recentComponents = recentComponents.map((trip, i) => {
            return (
              <OtherTripListComponent
                trip={trip}
                key={i}
                navigation={navigation}
                passengerCoordinates={[
                  trip.passengerData.filter(
                    (pData) => pData.uid === user.uid
                  )[0].location,
                ].flat(10)}
              />
            );
          });

          setTripListComponents({
            active: activeComponents,
            recent: recentComponents,
          });
          setIsLoading(false);
        });
      return unsub;
    }
  }, []);

  if (isLoading) return <LoadingPassenger />;

  if (
    tripListComponents.active.length === 0 &&
    tripListComponents.recent.length === 0
  )
    return (
      <View style={styles.container}>
        <Text color={colors.text}>No hiciste ningun viaje todavía.</Text>
        <Button onPress={() => navigation.navigate("Nuevo viaje")}>
          Unete a un nuevo viaje ahora
        </Button>
      </View>
    );

  return (
    <ScrollView>
      {tripListComponents.active.length === 0 ? null : (
        <List.Section>
          <List.Subheader>Activos</List.Subheader>
          {tripListComponents.active}
        </List.Section>
      )}
      {tripListComponents.recent.length === 0 ? null : (
        <List.Section>
          <List.Subheader>Recientes</List.Subheader>
          {tripListComponents.recent}
        </List.Section>
      )}
    </ScrollView>
  );
}

export default RecentTripsScreen;
