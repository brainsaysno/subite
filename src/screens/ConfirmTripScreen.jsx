import React, { useContext, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";
import HorizontalNumberPicker from "../components/HorizontalNumberPicker";
import { useTheme } from "react-native-paper";
import Button from "../components/Button";
import { DTComponent } from "../components/DTComponent";
import WidgetMapView from "../components/WidgetMapView";
import { getUnixNow } from "../core/utils";

function ConfirmTripScreen({ navigation, route }) {
  const { mapData } = route.params;
  const { user } = useContext(AppContext);
  const [date, setDate] = useState(new Date(getUnixNow()));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [capacity, setCapacity] = useState(1);

  const polyline = mapData.routes[0].overview_polyline.points;

  const handlePress = () => {
    const unixDate = Date.parse(date);
    if (unixDate < getUnixNow()) {
      setError("Esta fecha ya pasó, intenta de nuevo!");
      return;
    }
    setLoading(true);
    const tripData = {
      polyline: polyline,
      departureTime: Date.parse(date),
      capacity: capacity,
      driver: {
        uid: user.uid,
        fullName: user.fullName,
        phone: user.phone,
        plate: "***" + user.plate.slice(3),
        childName: user.childName,
      },
      passengerData: [],
      passengerUids: [],
      institutionName: user.institution.name,
      passengerCount: 0,
    };
    db.collection("trips")
      .add(tripData)
      .then(() => {
        navigation.navigate("Mapa");
        navigation.navigate("Detalle de viaje", { trip: tripData });
      })
      .catch((error) => {
        console.error("Error añadiendo el documento: ", error);
      });
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WidgetMapView
          polyline={polyline}
          navigation={navigation}
          passengerCoordinates={[]}
        />
        <View
          style={{
            marginTop: 20,
            width: "100%",
          }}
        >
          <DTComponent onChange={onDateChange} date={date} />
        </View>
        {error !== "" ? (
          <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
        ) : null}
        <HorizontalNumberPicker
          value={capacity}
          onChange={setCapacity}
          min={1}
          max={4}
          title={"Capacidad"}
          style={{ marginTop: 20 }}
        />
        <Button
          disabled={loading}
          onPress={handlePress}
          mode="contained"
          style={{ width: "80%" }}
        >
          Crear viaje
        </Button>
      </ScrollView>
    </>
  );
}

export default ConfirmTripScreen;
