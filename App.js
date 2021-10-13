import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

// Firebase
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { app } from "./firebase";

// Recoil
import { RecoilRoot } from "recoil";

// Utils
import tw from "./lib/tailwind";

// Screens
import LoginRegisterScreen from "./src/screens/LoginRegisterScreen";
import UserHomeScreen from "./src/screens/UserHomeScreen";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoggedIn(true);
        setLoaded(true);
      }
    });
  }, []);

  return !loaded ? (
    <View>
      <Text>Loading</Text>
    </View>
  ) : !loggedIn ? (
    <LoginRegisterScreen />
  ) : (
    <RecoilRoot>
      <UserHomeScreen />
    </RecoilRoot>
    /*
      <Provider store={store}>
        <UserHomeScreen />
      </Provider>
    */
  );
};

export default App;
