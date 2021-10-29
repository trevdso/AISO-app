import React from "react";
import { View, Text } from "react-native";

// Recoil
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { userLoggedIn, username } from "../recoil/atoms/userAtom";

// Firebase
import { getAuth, signOut } from "firebase/auth";

// Utils
import tw from "../../lib/tailwind";
import Button from "../components/Common/Button";

import socket from "../../socket";

const PreferencesScreen = () => {
  const name = useRecoilValue(username);
  const auth = getAuth();

  const logout = () => {
    signOut(auth)
      .then(socket.disconnect())
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-white`}>Username: {name}</Text>
      <Button type="dangerous" title="Logout" onPress={() => logout()}></Button>
    </View>
  );
};

export default PreferencesScreen;
