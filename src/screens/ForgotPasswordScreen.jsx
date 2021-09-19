import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { emailValidator } from "../core/utils";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

const ForgotPasswordScreen = ({ navigation }) => {
	const { colors } = useTheme();

	const [email, setEmail] = useState({ value: "", error: "" });

	const _onSendPressed = () => {
		const emailError = emailValidator(email.value);

		if (emailError) {
			setEmail({ ...email, error: emailError });
			return;
		}

		//TODO: add forgot password firebase method

		navigation.navigate("Login");
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
		<Background>
			<BackButton goBack={() => navigation.navigate("Login")} />

			<Logo />

			<Header>Restore Password</Header>

			<TextInput
				label="E-mail address"
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

			<Button mode="contained" onPress={_onSendPressed} style={styles.button}>
				Send Reset Instructions
			</Button>

			<TouchableOpacity
				style={styles.back}
				onPress={() => navigation.navigate("Login")}
			>
				<Text style={styles.label}>← Back to login</Text>
			</TouchableOpacity>
		</Background>
	);
};

export default ForgotPasswordScreen;
