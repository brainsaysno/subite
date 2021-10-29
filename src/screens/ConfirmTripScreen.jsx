import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { db } from "../../config/firebase";
import { AppContext } from "../../navigation/AppProvider";
import HorizontalNumberPicker from "../components/HorizontalNumberPicker";
import { useTheme } from "react-native-paper";
import Button from "../components/Button";
import { DTComponent } from "../components/DTComponent";
import WidgetMapView from "../components/WidgetMapView";
import { getEpochNow } from "../core/utils";

function ConfirmTripScreen({ navigation, route }) {
  const { mapData } = route.params;
  const { user } = useContext(AppContext);
  const [date, setDate] = useState(new Date(Date.now()));
  const [loading, setLoading] = useState(false);

  const [capacity, setCapacity] = useState(1);

  const polyline = mapData.routes[0].overview_polyline.points;

  const handlePress = () => {
    const epochDate = Date.parse(date);
    if (epochDate < getEpochNow()) {
      console.log("Time cannot be");
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
        console.error("Error adding document: ", error);
      });
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
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
            marginVertical: 20,
            width: "100%",
          }}
        >
          <DTComponent onChange={onDateChange} date={date} />
        </View>
        <HorizontalNumberPicker
          value={capacity}
          onChange={setCapacity}
          min={1}
          max={4}
          title={"Capacidad"}
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
