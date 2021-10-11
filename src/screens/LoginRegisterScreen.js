import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import aisohand from "../../assets/icon.png";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const LoginRegisterScreen = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginRegisterScreen;

const styles = StyleSheet.create({});
