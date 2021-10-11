import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

// Firebase
import firebase from "firebase";
import { firebaseConfig } from "./firebase";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("initialized");
}

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

// Utils
import tw from "./lib/tailwind";

// Screens
import LoginRegisterScreen from "./src/screens/LoginRegisterScreen";
import UserHomeScreen from "./src/screens/UserHomeScreen";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
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
    <Provider store={store}>
      <UserHomeScreen />
    </Provider>
  );
};

export default App;
