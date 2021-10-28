import React, { useContext, useState } from "react";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../../mapStyles";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import { decode } from "@googlemaps/polyline-codec";
import Constants from "expo-constants";
import { AppContext } from "../../navigation/AppProvider";
import Button from "../components/Button";
import { View } from "react-native";
import { Icon } from "react-native-eva-icons";

function CreateTripScreen({ navigation, ...props }) {
  const { dark, colors } = useTheme();
  const [mapData, setMapData] = useState({ markerOn: false });

  const { user } = useContext(AppContext);

  const handleMapPress = ({ coordinate }) => {
    fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${coordinate.latitude},${coordinate.longitude}&destination=${user.institution.coordinates.latitude}, ${user.institution.coordinates.longitude}&key=${Constants.manifest.extra.googleDirections.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const dataToSend = {
          markerCoordinates: coordinate,
          markerOn: true,
          ...data,
        };
        setMapData(dataToSend);
      });
  };
  if (!user.institution.coordinates) return null;

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={dark ? darkMapStyle : []}
        onPress={(e) => handleMapPress(e.nativeEvent)}
        initialRegion={{
          latitude: -34.907071,
          longitude: -56.168248,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: user.institution.coordinates.latitude,
            longitude: user.institution.coordinates.longitude,
          }}
        >
          <Icon name={"home"} width={20} height={20} fill={colors.yellow} />
        </Marker>
        {mapData.markerOn ? (
          <>
            <Marker
              coordinate={mapData.markerCoordinates}
              key={-1}
              pinColor={colors.primary}
            />
            <Polyline
              coordinates={decode(
                mapData.routes[0].overview_polyline.points,
                5
              ).map((arr) => ({ latitude: arr[0], longitude: arr[1] }))}
              lineDashPattern={[10, 1]}
              strokeWidth={5}
            ></Polyline>
          </>
        ) : null}
      </MapView>
      {mapData.markerOn ? (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            onPress={() =>
              navigation.navigate("Confirmar viaje", {
                mapData: mapData,
              })
            }
            mode="contained"
            style={{ width: 200 }}
          >
            Continuar
          </Button>
        </View>
      ) : null}
    </>
  );
}

export default CreateTripScreen;
