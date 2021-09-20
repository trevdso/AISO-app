import React from "react";
import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
  Alert,
  Platform,
} from "react-native";
import Button from "./src/components/Button/Button";
import tw from "./lib/tailwind";

const App = () => {
  StatusBar.setBarStyle("light-content", true);
  Platform.OS === "android" && StatusBar.setTranslucent(true);
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center bg-aiso-gray`}>
      <StatusBar style={tw`text-white`} />
      <View style={tw`bg-aiso-gray`}>
        <Text style={tw`text-white`}>Test app</Text>
        <Button title="Test!" onPress={() => Alert.alert("Clicked!")} />
      </View>
    </SafeAreaView>
  );
};

export default App;
