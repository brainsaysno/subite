import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";
import { Icon } from "react-native-eva-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../../config/firebase";
import Button from "../components/Button";

function SetRadiusScreen({ navigation }) {
  const { colors } = useTheme();
  const { user, setUser } = useContext(AppContext);
  const [radius, setRadius] = useState(user.radius ? user.radius : 0.1);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setRadius(Math.round(radius * 10 + 1) / 10)}
      >
        <Icon
          name={"arrow-ios-upward-outline"}
          width={100}
          height={100}
          fill={colors.blue}
        />
      </TouchableOpacity>
      <Text style={{ fontWeight: "600", fontSize: 24 }}>
        {radius * 1000} mts
      </Text>
      <TouchableOpacity
        onPress={() =>
          radius == 0.1 ? null : setRadius(Math.round(radius * 10 - 1) / 10)
        }
      >
        <Icon
          name={"arrow-ios-downward-outline"}
          width={100}
          height={100}
          fill={colors.blue}
        />
      </TouchableOpacity>
      <Button
        color={colors.blue}
        mode="contained"
        style={{ width: 200 }}
        onPress={() => {
          db.collection("users").doc(user.uid).update({
            radius: radius,
          });
          setUser({
            ...user,
            radius: radius,
          });
          navigation.goBack();
          navigation.navigate("Nuevo viaje");
        }}
      >
        Ok!
      </Button>
    </View>
  );
}

export default SetRadiusScreen;
