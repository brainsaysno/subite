import React from "react";
import { useContext } from "react";
import { View, Text, Linking } from "react-native";
import { useTheme } from "react-native-paper";
import { AppContext } from "../../navigation/AppProvider";

function AccountData() {
  const { user } = useContext(AppContext);
  const { colors } = useTheme();
  const message = `Hola, soy ${user.fullName}, mi id de usuario es ${user.uid}. Me gustaría cambiar los datos de mi cuenta.`;
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        Nombre:
        <Text style={{ fontWeight: "200" }}> {user.fullName}</Text>
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>
        Email: <Text style={{ fontWeight: "200" }}>{user.email}</Text>
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>
        Nombre del hijo/a:{" "}
        <Text style={{ fontWeight: "200" }}>{user.childName}</Text>
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>
        Institución:{" "}
        <Text style={{ fontWeight: "200" }}>{user.institution.name}</Text>
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>
        Teléfono: <Text style={{ fontWeight: "200" }}>{user.phone}</Text>
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>
        Matricula: <Text style={{ fontWeight: "200" }}>{user.plate}</Text>
      </Text>
      <Text
        style={{ color: colors.primary, alignSelf: "center", marginTop: 10 }}
        onPress={() =>
          Linking.openURL(
            `https://wa.me/59895078292?text=${encodeURIComponent(message)}`
          )
        }
      >
        Para cambiar tu información haz click aquí.
      </Text>
    </View>
  );
}

export default AccountData;
