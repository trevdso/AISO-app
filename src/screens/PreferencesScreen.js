import React from "react";
import { View, Text } from "react-native";

// Recoil
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { userLoggedIn, username } from "../recoil/atoms/userAtom";

// Utils
import tw from "../../lib/tailwind";

const PreferencesScreen = () => {
  const name = useRecoilValue(username);
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-white`}>Username: {name}</Text>
    </View>
  );
};

export default PreferencesScreen;
