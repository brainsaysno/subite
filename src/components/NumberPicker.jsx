import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-eva-icons";
import { useTheme } from "react-native-paper";

function HorizontalNumberPicker({ value, onChange, min, max, title }) {
	const { colors } = useTheme();

	return (
		<>
			{title ? <Text>{title}:</Text> : null}
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					onPress={() => (value == min ? null : onChange(value - 1))}
				>
					<Icon
						name={"chevron-left-outline"}
						width={100}
						height={100}
						fill={colors.primary}
					/>
				</TouchableOpacity>
				<Text style={{ color: colors.text }}>{value}</Text>
				<TouchableOpacity
					onPress={() => (value == max ? null : onChange(value + 1))}
				>
					<Icon
						name={"chevron-right-outline"}
						width={100}
						height={100}
						fill={colors.primary}
					/>
				</TouchableOpacity>
			</View>
		</>
	);
}

export default HorizontalNumberPicker;
