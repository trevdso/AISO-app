import React, { useState } from "react";

// Firebase
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../../firebase";

// Components
import { StyleSheet, Text, View, Image } from "react-native";
import TextField from "../Common/TextField";
import Button from "../Common/Button";

// Socketio
import socket from "../../../socket";

// Tailwind
import tw from "../../../lib/tailwind";

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
    <View style={tw`flex-1 items-center justify-center bg-aiso-gray`}>
      <Image />
      <View style={tw`flex-1.25 justify-end`}>
        <TextField placeholder="Email" onChangeText={(val) => setEmail(val)} />
        <TextField placeholder="Name" onChangeText={(val) => setName(val)} />
        <TextField
          placeholder="Password"
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <View style={tw`flex-0.75 items-center justify-start my-4`}>
        <Button
          title="Register"
          onPress={() => registerNewUser(email, name, password)}
        />
        <Text style={tw`text-white mt-2`}>Already a user? Login instead</Text>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
