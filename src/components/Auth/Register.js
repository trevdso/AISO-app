import React, { useState } from "react";

// Firebase
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import AlertRibbon from "../Common/AlertRibbon";

// Socketio
import socket from "../../../socket";

// Tailwind
import tw from "../../../lib/tailwind";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ state: false, message: "", type: "" });
  const auth = getAuth(app);

  const registerNewUser = (email, name, password) => {
    if (email == "" || password == "" || name == "") {
      setAlert({
        state: true,
        message: "Cannot leave email, name or password empty",
        type: "warning",
      });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          setDoc(doc(getFirestore(app), "users", auth.currentUser.uid), {
            name: name,
            email: email,
          });
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
            message: "Email already registered under an account",
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
        <View style={tw`flex-1.25 justify-end`}>
          <TextField
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
          />
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
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({});
