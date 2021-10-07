import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../../mapStyles";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import MapConfirmButton from "../components/MapConfirmButton";
import { AppContext } from "../../navigation/AppProvider";
import Button from "../components/Button";

function JoinTripScreen({ navigation }) {
	const { dark, colors } = useTheme();
	const [mapData, setMapData] = useState({ markerOn: false });
	const { user } = useContext(AppContext);

	const handleMapPress = ({ coordinate }) => {
		setMapData({ markerOn: true, markerCoordinates: coordinate });
	};

	const handleConfirm = () => {
		navigation.navigate("Trip Selector", {
			mapData: mapData,
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
				{mapData.markerOn && user ? (
					<>
						<Marker
							pinColor={"#ff6347"}
							coordinate={mapData.markerCoordinates}
						/>
						<Circle
							center={mapData.markerCoordinates}
							radius={user.radius * 1000}
							strokeColor={colors.text}
							fillColor={"#ff000040"}
							onPress={(e) => handleMapPress(e.nativeEvent)}
							/* #rgba */
						/>
					</>
				) : null}
			</MapView>
			{mapData.markerOn ? (
				<Button
					onPress={handleConfirm}
					mode="contained"
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

export default JoinTripScreen;
