import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "socket.io-client";

import tw from "../../../lib/tailwind";

const ConnectionStatus = ({ connected, device, id }) => {
  console.log(connected);
  console.log(device);
  return connected ? (
    <Text style={tw`text-green-700`}>
      successfully connected to {device} : {id}
    </Text>
  ) : (
    <Text style={tw`text-red-700`}>no connection established</Text>
  );
};

export default ConnectionStatus;
