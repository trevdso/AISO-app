import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "../../lib/tailwind";

const RemoteScreen = () => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-white`}>
        This is the Remote screen where our Remote Controller will reside
      </Text>
    </View>
  );
};

export default RemoteScreen;

const styles = StyleSheet.create({});
