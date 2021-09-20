import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import tw from "../../../lib/tailwind";

const Button = (props) => {
  const { onPress, title = "Placeholder" } = props;
  return (
    <Pressable
      style={tw`bg-aiso-blue items-center justify-center px-2 py-2`}
      onPress={onPress}
    >
      <Text style={tw`text-white`}>{title}</Text>
    </Pressable>
  );
};

export default Button;
