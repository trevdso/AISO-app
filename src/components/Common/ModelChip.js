import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "../../../lib/tailwind";

const ModelChip = (props) => {
  const { onPress, name = "", selected = false } = props;
  return (
    <Pressable
      style={tw`bg-gray-600 flex-row justify-between px-2 py-2 w-80 border-r-2 border-aiso-blue mb-px`}
      onPress={onPress}
    >
      <Text style={tw`text-white`}>{name}</Text>
      {selected ? (
        <MaterialCommunityIcons
          name={"checkbox-marked-circle-outline"}
          size={20}
          color={"white"}
        />
      ) : (
        <MaterialCommunityIcons
          name={"checkbox-blank-circle-outline"}
          size={20}
          color={"white"}
        />
      )}
    </Pressable>
  );
};

export default ModelChip;
