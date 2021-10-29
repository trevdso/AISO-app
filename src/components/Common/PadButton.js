import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "../../../lib/tailwind";

const PadButton = (props) => {
  const { onPress, icon = "default", disabled = true } = props;
  var ico = "default";
  var color = "white";
  switch (icon) {
    case "up":
      ico = "arrow-up-drop-circle";
      break;
    case "down":
      ico = "arrow-down-drop-circle";
      break;
    case "left":
      ico = "arrow-left-drop-circle";
      break;
    case "right":
      ico = "arrow-right-drop-circle";
      break;
    case "disconnect":
      ico = "link-off";
      break;
    case "stop":
      ico = "stop-circle";
      color = "red-500";
      break;
    case "default":
      ico = "checkbox-marked-circle";
      break;
  }
  return disabled ? (
    <Pressable
      style={tw`bg-gray-500 items-center justify-center px-2 py-2 w-20 h-20 rounded`}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialCommunityIcons
        name={ico}
        size={"40px"}
        color={tw.color("gray-400")}
      />
      {/*ico == "link-off" && <Text style={tw`text-white`}>Disconnect</Text>*/}
    </Pressable>
  ) : (
    <Pressable
      style={tw`bg-gray-500 items-center justify-center px-2 py-2 w-20 h-20 rounded`}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={ico}
        size={"40px"}
        color={tw.color(color)}
      />
      {/*ico == "link-off" && <Text style={tw`text-white`}>Disconnect</Text>*/}
    </Pressable>
  );
};

export default PadButton;
