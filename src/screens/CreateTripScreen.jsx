import React, { useContext, useState } from "react";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../../mapStyles";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import { decode } from "@googlemaps/polyline-codec";
import { GOOGLE_MAPS_API_KEY } from "../../keys.js";
import { AppContext } from "../../navigation/AppProvider";
import MapConfirmButton from "../components/MapConfirmButton";
import Button from "../components/Button";

function CreateTripScreen({ navigation, ...props }) {
	const { dark, colors } = useTheme();
	const [mapData, setMapData] = useState({ markerOn: false });

	const { user } = useContext(AppContext);

	const handleMapPress = ({ coordinate }) => {
		fetch(
			`https://maps.googleapis.com/maps/api/directions/json?origin=${coordinate.latitude},${coordinate.longitude}&destination=${user.institution.coordinates.latitude}, ${user.institution.coordinates.longitude}&key=${GOOGLE_MAPS_API_KEY}`
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
				{mapData.markerOn ? (
					<>
						<Marker coordinate={mapData.markerCoordinates}></Marker>
						<Polyline
							coordinates={decode(
								mapData.routes[0].overview_polyline.points,
								5
							).map((arr) => ({ latitude: arr[0], longitude: arr[1] }))}
							lineDashPattern={[0]}
							strokeWidth={5}
						></Polyline>
					</>
				) : null}
			</MapView>
			{mapData.markerOn ? (
				<Button
					onPress={() =>
						navigation.navigate("Confirm Create Trip", {
							mapData: mapData,
						})
					}
					mode="contained"
					// Horizontal centering may not work on all device sizes
					style={{
						position: "absolute",
						bottom: 10,
						left: "25%",
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						width: 200,
					}}
				>
					Confirmar
				</Button>
			) : null}
		</>
	);
}

export default CreateTripScreen;
