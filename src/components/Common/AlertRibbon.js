import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import tw from "../../../lib/tailwind";

const AlertRibbon = ({ msg, type }) => {
  if (type == "success") {
    return (
      <View
        style={tw`bg-green-700 flex-row justify-center items-center rounded-sm w-80 my-2`}
      >
        <MaterialCommunityIcons
          name={"checkbox-marked-circle-outline"}
          size={20}
          color={"white"}
          style={tw`px-2`}
        />
        <Text style={tw`text-white px-2 py-2`}>{msg}</Text>
      </View>
    );
  } else if (type == "warning") {
    return (
      <View
        style={tw`bg-yellow-400 flex-row justify-center items-center rounded-sm w-80 my-2`}
      >
        <MaterialCommunityIcons
          name={"alert-outline"}
          size={20}
          color={"white"}
          style={tw`px-2`}
        />
        <Text style={tw`text-white px-2 py-2`}>{msg}</Text>
      </View>
    );
  } else if (type == "error") {
    return (
      <View
        style={tw`bg-red-700 flex-row justify-center items-center rounded-sm w-80 my-2`}
      >
        <MaterialCommunityIcons
          name={"alert-circle-outline"}
          size={20}
          color={"white"}
          style={tw`px-2`}
        />
        <Text style={tw`text-white px-2 py-2`}>{msg}</Text>
      </View>
    );
  }
};

export default AlertRibbon;
