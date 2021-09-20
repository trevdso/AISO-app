import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text, View, Alert } from "react-native";
import Button from "./src/components/Button/Button";
import tw from "./lib/tailwind";

const App = () => {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center bg-aiso-gray`}>
      <View style={tw`bg-aiso-gray`}>
        <Text style={tw`text-white`}>Test app</Text>
        <Button title="Test!" onPress={() => Alert.alert("Clicked!")} />

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

export default App;
