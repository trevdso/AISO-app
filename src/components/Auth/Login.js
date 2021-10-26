import React, { useState } from "react";

import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { app } from "../../../firebase";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../Button/Button";
import tw from "../../../lib/tailwind";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={tw `flex-1 items-center justify-center bg-aiso-gray` } >
      /*I suggest there can be AI.SO logo on top */
      <TextInput style={ tw `text-indigo-50` }
        placeholder="Email"
        onChangeText={(val) => setEmail(val)}
      ></TextInput>
      <TextInput style={ tw `text-indigo-50` }
        placeholder="Password"
        secureTextEntry
        onChangeText={(val) => setPassword(val)}
      ></TextInput>
      <Button title="Login" onPress={() => login(email, password)} />
      <Text style={ tw `text-white font-sans`}>Not registered yet?</Text>
      <Button 
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});

