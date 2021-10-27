import React, { useState } from "react";
import { View, Platform } from "react-native";
import Button from "../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-with-locales-es6";

export function DTComponent({ onChange, date }) {
	const [show, setShow] = useState(Platform.OS === "ios");
	const [mode, setMode] = useState("date");

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatePicker = () => {
		showMode("date");
	};

	const showTimePicker = () => {
		showMode("time");
	};

	const customOnChange = (e, selectedDate) => {
		setShow(Platform.OS === "ios");
		onChange(e, selectedDate);
	};

	if (Platform.OS === "ios")
		return (
			<DateTimePicker
				style={{ width: "100%" }}
				value={date}
				mode="time"
				is24Hour={true}
				display="default"
				onChange={customOnChange}
			/>
		);
	return (
		<View
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<View style={{ width: "50%" }}>
				<Button
					onPress={() => showDatePicker()}
					mode="outlined"
					style={{
						marginBottom: 10,
					}}
				>
					{moment(date).locale("es").format("DD/MM/YYYY")}
				</Button>
				<Button onPress={() => showTimePicker()} mode="outlined">
					{moment(date).locale("es").format("HH:mm")}
				</Button>
			</View>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={mode}
					is24Hour={true}
					display="default"
					onChange={customOnChange}
				/>
			)}
		</View>
	);
}
