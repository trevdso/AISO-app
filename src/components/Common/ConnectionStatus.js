import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "socket.io-client";

import tw from "../../../lib/tailwind";

const ConnectionStatus = ({ connected, device, id }) => {
  return connected ? (
    <View
      style={tw`bg-green-700 flex-row justify-center items-center rounded-sm w-full`}
    >
      <MaterialCommunityIcons
        name={"checkbox-marked-circle-outline"}
        size={"20px"}
        color={"white"}
        style={tw`px-2`}
      />
      <Text style={tw`text-white px-2 py-2`}>
        Connected to {device} : {id}
      </Text>
    </View>
  ) : (
    <View
      style={tw`bg-red-700 flex-row justify-center items-center rounded-sm w-full`}
    >
      <MaterialCommunityIcons
        name={"alert-circle-outline"}
        size={"20px"}
        color={"white"}
        style={tw`px-2`}
      />
      <Text style={tw`text-white px-2 py-2`}>No connection established</Text>
    </View>
  );
};

export default ConnectionStatus;
