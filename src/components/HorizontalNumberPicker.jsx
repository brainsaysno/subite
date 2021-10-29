import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-eva-icons";
import { useTheme } from "react-native-paper";

function HorizontalNumberPicker({
  value,
  onChange,
  min,
  max,
  choices,
  title,
  ...props
}) {
  const { colors } = useTheme();

  return (
    <View style={props.style}>
      {title ? (
        <Text style={{ textAlign: "center", fontWeight: "400", fontSize: 16 }}>
          {title}:
        </Text>
      ) : null}
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
            width={75}
            height={75}
            fill={colors.primary}
          />
        </TouchableOpacity>
        <Text style={{ color: colors.text, fontSize: 20 }}>{value}</Text>
        <TouchableOpacity
          onPress={() => (value == max ? null : onChange(value + 1))}
        >
          <Icon
            name={"chevron-right-outline"}
            width={75}
            height={75}
            fill={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HorizontalNumberPicker;
