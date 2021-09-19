import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const App = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white items-center justify-center`}>
      <View>
        <Text>Test app</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

export default App;
