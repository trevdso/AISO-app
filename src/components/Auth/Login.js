import React, { useState } from "react";

// Firebase
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { app } from "../../../firebase";

// Components
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Button from "../Common/Button";
import TextField from "../Common/TextField";

// Socketio
import socket from "../../../socket";

// Tailwind
import tw from "../../../lib/tailwind";
import AlertRibbon from "../Common/AlertRibbon";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ state: false, message: "", type: "" });
  const auth = getAuth(app);

  const login = (email, password) => {
    if (email == "" || password == "") {
      setAlert({
        state: true,
        message: "Cannot leave email or password empty",
        type: "warning",
      });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          socket.auth = { deviceType: "user" };
          socket.auth.name = email;
          socket.connect();
          setAlert({
            state: true,
            message: "Successfully logged in",
            type: "success",
          });
        })
        .catch((error) => {
          setAlert({
            state: true,
            message: "Invalid credentials",
            type: "error",
          });
          console.log(error);
        });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={tw`flex-1 items-center justify-center bg-aiso-gray`}>
        <Image
          style={tw`h-60 w-60`}
          source={require("../../../assets/icon.png")}
        />
        {alert.state && <AlertRibbon msg={alert.message} type={alert.type} />}
        <View style={tw`flex-1.25 justify-end items-center`}>
          <TextField
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
          />
          <TextField
            placeholder="Password"
            secureTextEntry
            onChangeText={(val) => setPassword(val)}
          />
        </View>
        <View style={tw`flex-0.75 items-center justify-start my-4`}>
          <Button title="Login" onPress={() => login(email, password)} />
          <Text style={tw`text-white mt-2`}>Not registered yet?</Text>
          <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({});
