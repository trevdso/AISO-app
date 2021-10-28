import React, { useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../../firebase";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Button from "../Button/Button";
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <View style={tw `flex-1 items-center justify-center bg-aiso-gray`}>
      <TextInput style={ tw `text-indigo-50` }
        placeholder="Email"
        onChangeText={(val) => setEmail(val)}
      ></TextInput>
      <TextInput style={ tw `text-indigo-50` }
        placeholder="Name"
        onChangeText={(val) => setName(val)}
      ></TextInput>
      <TextInput style={ tw `text-indigo-50` }
        placeholder="Password"
        secureTextEntry
        onChangeText={(val) => setPassword(val)}
      ></TextInput>
      <Button
        title="Register"
        onPress={() => registerNewUser(email, name, password)}
      />
      <Text style={ tw `text-indigo-50` }>Already a user? Login instead</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
