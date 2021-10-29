import React, { useContext, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../../mapStyles";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import { AppContext } from "../../navigation/AppProvider";
import Button from "../components/Button";
import { View } from "react-native";
import { Icon } from "react-native-eva-icons";

function JoinTripScreen({ navigation }) {
  const { dark, colors } = useTheme();
  const [mapData, setMapData] = useState({ markerOn: false });
  const { user } = useContext(AppContext);

  const handleMapPress = ({ coordinate }) => {
    setMapData({ markerOn: true, markerCoordinates: coordinate });
  };

  const handleConfirm = () => {
    navigation.navigate("Seleccionar viaje", {
      mapData: mapData,
    });
  };

  if (!user) return null;

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
          <Icon
            name={"home"}
            width={20}
            height={20}
            fill={colors.dbackground}
          />
        </Marker>
        {mapData.markerOn && user ? (
          <>
            <Marker
              pinColor={colors.blue}
              key={-1}
              coordinate={mapData.markerCoordinates}
            />
            <Circle
              center={mapData.markerCoordinates}
              radius={user.radius * 1000}
              strokeColor={colors.text}
              fillColor={colors.blue + "90"}
              onPress={(e) => handleMapPress(e.nativeEvent)}
              /* #rgba */
            />
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
            onPress={handleConfirm}
            mode="contained"
            style={{ width: 200 }}
            color={colors.blue}
          >
            Buscar viajes
          </Button>
        </View>
      ) : null}
    </>
  );
}

export default JoinTripScreen;
