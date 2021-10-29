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
      {/* <TouchableOpacity
				style={{
					display: "flex",
					flexDirection: "row",
					backgroundColor: colors.green,
					padding: 15,
					marginTop: "auto",
					marginBottom: "auto",
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
						fontSize: 16,
						fontWeight: "500",
					}}
				>
					Contacta con el desarrollador para cambiar tu información (Beta)
				</Text>
			</TouchableOpacity> */}
    </View>
  );
}

export default AccountData;
