import React, { useState } from "react";

import firebase from "firebase";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../Button/Button";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(val) => setEmail(val)}
      ></TextInput>
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(val) => setPassword(val)}
      ></TextInput>
      <Button title="Login" onPress={() => login(email, password)} />
      <Text>Not registered yet?</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
