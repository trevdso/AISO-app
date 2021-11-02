import React from "react";
import { TextInput } from "react-native";
import tw from "../../../lib/tailwind";

const TextField = (props) => {
  const { onChangeText, placeholder, secureTextEntry } = props;
  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={tw`bg-white px-2 py-2 w-80 border-b-2 border-aiso-blue mb-2`}
    />
  );
};

export default TextField;
