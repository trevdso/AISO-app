import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Button from "../components/Button/Button";

//import { io } from "socket.io-client";

import tw from "../../lib/tailwind";

const DevicesScreen = () => {
  //const socket = io();
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-white`}>Test app</Text>
      <Button title="Test!" onPress={() => Alert.alert("Clicked!")} />
    </View>
  );
};

export default DevicesScreen;

const styles = StyleSheet.create({});
