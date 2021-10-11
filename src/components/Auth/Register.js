import React, { useState } from "react";

import firebase from "firebase";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Button from "../Button/Button";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const registerNewUser = (email, name, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({ name, email });
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
