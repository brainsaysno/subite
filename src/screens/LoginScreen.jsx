import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { useTheme } from "react-native-paper";
import { emailValidator, passwordValidator } from "../core/utils";
import { auth, db } from "../../config/firebase";

const LoginScreen = ({ navigation }) => {
	const { colors } = useTheme();

	const [email, setEmail] = useState({ value: "", error: "" });
	const [password, setPassword] = useState({ value: "", error: "" });

	const onLoginPressed = () => {
		const emailError = emailValidator(email.value);
		const passwordError = passwordValidator(password.value);

		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
		}

		auth
			.signInWithEmailAndPassword(email.value, password.value)
			.then((authenticatedUser) => {})
			.catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					//TODO: Add login backend errors
				}

				if (error.code === "auth/invalid-email") {
					//TODO: Add login backend errors
				}

				console.error(error);
			});
		return;
	};

	const styles = StyleSheet.create({
		forgotPassword: {
			width: "100%",
			alignItems: "flex-end",
			marginBottom: 24,
		},
		row: {
			flexDirection: "row",
			marginTop: 4,
		},
		label: {
			color: colors.primary,
		},
		link: {
			fontWeight: "bold",
			color: colors.accent,
		},
	});

	return (
		<Background>
			<BackButton goBack={() => navigation.navigate("Driver Selector")} />
			<Logo />

			<Header>Welcome back.</Header>

			<TextInput
				label="Email"
				returnKeyType="next"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: "" })}
				error={!!email.error}
				errorText={email.error}
				autoCapitalize="none"
				autoCompleteType="email"
				textContentType="emailAddress"
				keyboardType="email-address"
			/>

			<TextInput
				label="Password"
				returnKeyType="done"
				value={password.value}
				onChangeText={(text) => setPassword({ value: text, error: "" })}
				error={!!password.error}
				errorText={password.error}
				secureTextEntry
			/>

			<View style={styles.forgotPassword}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Forgot Password")}
				>
					<Text style={styles.label}>Forgot your password?</Text>
				</TouchableOpacity>
			</View>

			<Button mode="contained" onPress={onLoginPressed}>
				Login
			</Button>

			<View style={styles.row}>
				<Text style={styles.label}>Don’t have an account? </Text>
				<TouchableOpacity onPress={() => navigation.navigate("Register")}>
					<Text style={styles.link}>Sign up</Text>
				</TouchableOpacity>
			</View>
		</Background>
	);
};

export default LoginScreen;
