import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import tw from "../../../lib/tailwind";

const TextField = (props) => {
  const { onChangeText, placeholder, secureTextEntry } = props;
  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeholder && placeholder}
      secureTextEntry={secureTextEntry}
      style={tw`bg-white px-2 py-2 w-80 border-b-2 border-aiso-blue mb-2`}
    />
  );
};

export default TextField;
