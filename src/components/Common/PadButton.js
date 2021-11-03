import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "../../../lib/tailwind";

const PadButton = (props) => {
  const { onPress, icon = "default", disabled = true } = props;
  var ico = "default";
  var color = "white";
  var rounded = "rounded";
  switch (icon) {
    case "up":
      ico = "arrow-up-drop-circle";
      rounded = "rounded-t-lg";
      break;
    case "down":
      ico = "arrow-down-drop-circle";
      rounded = "rounded-b-lg";
      break;
    case "left":
      ico = "arrow-left-drop-circle";
      rounded = "rounded-tl-lg rounded-bl-lg";
      break;
    case "right":
      ico = "arrow-right-drop-circle";
      rounded = "rounded-tr-lg rounded-br-lg";
      break;
    case "disconnect":
      ico = "link-off";
      rounded = "rounded-full";
      break;
    case "estop":
      ico = "stop-circle";
      color = "red-500";
      rounded = "rounded-full";
      break;
    case "pickup":
      ico = "hand-right";
      rounded = "rounded";
      break;
    case "sort":
      ico = "arrow-decision";
      color = "aiso-blue";
      rounded = "rounded-full";
      break;
  }
  return disabled ? (
    <Pressable
      style={tw`bg-gray-500 items-center justify-center px-2 py-2 w-20 h-20 ${rounded}`}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialCommunityIcons
        name={ico}
        size={40}
        color={tw.color("gray-400")}
      />
    </Pressable>
  ) : (
    <Pressable
      style={tw`bg-gray-500 items-center justify-center px-2 py-2 w-20 h-20 ${rounded}`}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={ico} size={40} color={tw.color(color)} />
    </Pressable>
  );
};

export default PadButton;
