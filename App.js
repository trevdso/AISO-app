import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

// Recoil
import { RecoilRoot } from "recoil";

// Firebase
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { app } from "./firebase";

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

  return (
    <RecoilRoot>
      {!loaded ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : !loggedIn ? (
        <LoginRegisterScreen />
      ) : (
        <UserHomeScreen />
      )}
    </RecoilRoot>
  );
};

export default App;
