import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import tw from "../../../lib/tailwind";

const Button = (props) => {
  const { onPress, title = "Placeholder", type = "normal" } = props;
  if (type == "normal") {
    return (
      <Pressable
        style={tw`bg-aiso-blue items-center justify-center px-2 py-2 w-40 rounded-sm`}
        onPress={onPress}
      >
        <Text style={tw`text-white`}>{title}</Text>
      </Pressable>
    );
  } else if (type == "dangerous") {
    return (
      <Pressable
        style={tw`bg-red-600 items-center justify-center px-2 py-2 rounded-sm`}
        onPress={onPress}
      >
        <Text style={tw`text-white`}>{title}</Text>
      </Pressable>
    );
  }
};

export default Button;
