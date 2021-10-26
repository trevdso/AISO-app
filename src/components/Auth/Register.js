import React, { useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../../firebase";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Button from "../Button/Button";

import socket from "../../../socket";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);

  const registerNewUser = (email, name, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setDoc(doc(getFirestore(app), "users", auth.currentUser.uid), {
          name: name,
          email: email,
        });
        socket.auth = { deviceType: "user" };
        socket.auth.name = email;
        socket.connect();
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
        placeholder="Name"
        onChangeText={(val) => setName(val)}
      ></TextInput>
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(val) => setPassword(val)}
      ></TextInput>
      <Button
        title="Register"
        onPress={() => registerNewUser(email, name, password)}
      />
      <Text>Already a user? Login instead</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
