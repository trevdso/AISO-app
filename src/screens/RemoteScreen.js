import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "../../lib/tailwind";

import ConnectionStatus from "../components/Common/ConnectionStatus";

const RemoteScreen = ({ navigation, route }) => {
  console.log(route);
  const device = route.params ? route.params.device : null;
  console.log(device);
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      {device != null ? (
        <ConnectionStatus
          connected={true}
          device={device.name}
          id={device.id}
        ></ConnectionStatus>
      ) : (
        <ConnectionStatus
          connected={false}
          device={"nah b"}
          id={0}
        ></ConnectionStatus>
      )}
      <View>
        <Text style={tw`text-white`}>
          This is the Remote screen where our Remote Controller will reside
        </Text>
      </View>
    </View>
  );
};

export default RemoteScreen;

const styles = StyleSheet.create({});
