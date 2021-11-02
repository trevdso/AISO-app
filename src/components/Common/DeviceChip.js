import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "../../../lib/tailwind";

const DeviceChip = (props) => {
  const { onPress, name = "", deviceID } = props;
  return (
    <Pressable
      style={tw`bg-gray-600 flex-row justify-between px-2 py-2 w-80 border-r-2 border-aiso-blue mb-px`}
      onPress={onPress}
    >
      <Text style={tw`text-white`}>{name}</Text>
      {deviceID && <Text style={tw`text-gray-300 text-xs`}>{deviceID}</Text>}
      <MaterialCommunityIcons name={"circle"} size={20} color={"green"} />
    </Pressable>
  );
};

export default DeviceChip;
