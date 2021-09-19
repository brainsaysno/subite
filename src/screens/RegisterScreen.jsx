import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { useTheme } from "react-native-paper";
import {
	emailValidator,
	passwordValidator,
	nameValidator,
} from "../core/utils";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import { auth } from "../../config/firebase";

const RegisterScreen = ({ navigation }) => {
	const { colors } = useTheme();

	const [name, setName] = useState({ value: "", error: "" });
	const [email, setEmail] = useState({ value: "", error: "" });
	const [password, setPassword] = useState({ value: "", error: "" });

	const onSignUpPressed = () => {
		const nameError = nameValidator(name.value);
		const emailError = emailValidator(email.value);
		const passwordError = passwordValidator(password.value);

		if (emailError || passwordError || nameError) {
			setName({ ...name, error: nameError });
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			//return;
		}

		auth
			.createUserWithEmailAndPassword(email.value, password.value)
			.then(() => {
				/* authenticatedUser.user.updateProfile({
          displayName: name.value,
        }); */
				console.log("User account created & signed in!");
			})
			.catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					console.log("That email address is already in use!");
				}

				if (error.code === "auth/invalid-email") {
					console.log("That email address is invalid!");
				}

				console.error(error);
			});
	};

	const styles = StyleSheet.create({
		label: {
			color: colors.secondary,
		},
		button: {
			marginTop: 24,
		},
		row: {
			flexDirection: "row",
			marginTop: 4,
		},
		link: {
			fontWeight: "bold",
			color: colors.primary,
		},
	});

	return (
		<Background>
			<BackButton goBack={() => navigation.navigate("Login")} />

			<Logo />

			<Header>Create Account</Header>

			<TextInput
				label="Name"
				returnKeyType="next"
				value={name.value}
				onChangeText={(text) => setName({ value: text, error: "" })}
				error={!!name.error}
				errorText={name.error}
			/>

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

			<Button mode="contained" onPress={onSignUpPressed} style={styles.button}>
				Sign Up
			</Button>

			<View style={styles.row}>
				<Text style={styles.label}>Already have an account? </Text>
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={styles.link}>Login</Text>
				</TouchableOpacity>
			</View>
		</Background>
	);
};

export default RegisterScreen;
