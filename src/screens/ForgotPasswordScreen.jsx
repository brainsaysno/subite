import React, { useContext, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { emailValidator } from "../core/utils";
import KeyboardAvoidingCustom from "../components/KeyboardAvoidingCustom";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { AppContext } from "../../navigation/AppProvider";
import { auth } from "../../config/firebase";

const ForgotPasswordScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { isDriver } = useContext(AppContext);

  const [email, setEmail] = useState({ value: "", error: "" });

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    auth
      .sendPasswordResetEmail(email.value)
      .then(() => navigation.navigate("Login"))
      .catch((e) => {
        let errorMessage;
        if (e.code === "auth/user-not-found") {
          errorMessage =
            "No hay ningun usuario registrado con este email. Contacta con tu institución para registrarte.";
        } else {
          errorMessage = e.toString();
        }
        setEmail({
          ...email,
          error: errorMessage,
        });
      });
  };

  const styles = StyleSheet.create({
    back: {
      width: "100%",
      marginTop: 12,
    },
    button: {
      marginTop: 12,
    },
    label: {
      color: colors.secondary,
      width: "100%",
    },
  });

  return (
    <KeyboardAvoidingCustom>
      <BackButton goBack={() => navigation.navigate("Login")} />

      <Logo />

      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button
        mode="contained"
        onPress={_onSendPressed}
        style={styles.button}
        color={isDriver ? colors.primary : colors.blue}
      >
        Enviar instrucciones
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.label}>← Volver al login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingCustom>
  );
};

export default ForgotPasswordScreen;
