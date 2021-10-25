import React from "react";
import { useContext } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { useTheme } from "react-native-paper";
import { AppContext } from "../../navigation/AppProvider";
import styles from "../styles";
import { Icon } from "react-native-eva-icons";

function AccountData() {
  const { user } = useContext(AppContext);
  const { colors } = useTheme();
  console.log(user);
  const message = `Hola, soy ${user.fullName}, mi id de usuario es ${user.uid}. Me gustaría cambiar los datos de mi cuenta.`;
  return (
    <View style={{ ...styles.container, alignItems: "flex-start" }}>
      <Text style={{ fontSize: 20 }}>Nombre: {user.fullName}</Text>
      <Text style={{ fontSize: 20 }}>Email: {user.email}</Text>
      <Text style={{ fontSize: 20 }}>Institución: {user.institution.name}</Text>
      <Text style={{ fontSize: 20 }}>Teléfono: {user.phone}</Text>
      <Text style={{ fontSize: 20 }}>Matricula: {user.plate}</Text>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: colors.error,
          padding: 15,
          marginTop: 20,
          width: "100%",
        }}
        onPress={() =>
          Linking.openURL(
            `https://wa.me/59895078292?text=${encodeURIComponent(message)}`
          )
        }
      >
        <Icon
          name="message-circle-outline"
          width={40}
          height={40}
          fill={colors.background}
          style={{ marginRight: 10 }}
        />
        <Text
          style={{
            color: colors.background,
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          Contacta con el desarrollador para cambiar tu información (Beta)
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default AccountData;
