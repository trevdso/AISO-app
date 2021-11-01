import React, { useState } from "react";

// Firebase
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { app } from "../../../firebase";

// Components
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../Common/Button";
import TextField from "../Common/TextField";

// Socketio
import socket from "../../../socket";

// Tailwind
import tw from "../../../lib/tailwind";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        socket.auth = { deviceType: "user" };
        socket.auth.name = email;
        socket.connect();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-aiso-gray`}>
      <Image source={require("../../../assets/icon.png")} />
      <View style={tw`flex-1 justify-end`}>
        <TextField placeholder="Email" onChangeText={(val) => setEmail(val)} />
        <TextField
          placeholder="Password"
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <View style={tw`flex-1 items-center justify-start my-4`}>
        <Button title="Login" onPress={() => login(email, password)} />
        <Text style={tw`text-white mt-2`}>Not registered yet?</Text>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
