import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { darkStyle as darkMapStyle } from "../../mapStyles";
import styles from "../styles";
import { useTheme } from "react-native-paper";
import MapConfirmButton from "../components/MapConfirmButton";
import { AppContext } from "../../navigation/AppProvider";

function JoinTripScreen({ navigation }) {
	const { dark, colors } = useTheme();
	const [mapData, setMapData] = useState({ markerOn: false });
	const { user } = useContext(AppContext);

	const handleMapPress = ({ coordinate }) => {
		setMapData({ markerOn: true, markerCoordinates: coordinate });
	};

	useEffect(() => {
		console.log(mapData);
	}, []);

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
						<Marker coordinate={mapData.markerCoordinates} />
						<Circle
							center={mapData.markerCoordinates}
							radius={user.radius * 1000}
							strokeColor={colors.text}
							fillColor={"#ff000040"}
							/* #rgba */
						/>
					</>
				) : null}
			</MapView>
			{mapData.markerOn ? (
				<MapConfirmButton
					navigation={navigation}
					mapData={mapData}
					screenName={"Trip Selector"}
				/>
			) : null}
		</>
	);
}

export default JoinTripScreen;
