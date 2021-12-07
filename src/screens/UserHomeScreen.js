import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

// Recoil
import { useSetRecoilState } from "recoil";
import { username } from "../recoil/atoms/userAtom";

// Firebase
import { app, db } from "../../firebase";
import { getDoc, doc } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

// Socket
import socket from "../../socket";

// Utils
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "../../lib/tailwind";

// Screens
import DevicesScreen from "./DevicesScreen";
import ModelsScreen from "./ModelsScreen";
import RemoteScreen from "./RemoteScreen";
import PreferencesScreen from "./PreferencesScreen";

const UserHomeScreen = () => {
  const Tab = createBottomTabNavigator();
  const setUsername = useSetRecoilState(username);

  const globalTheme = {
    colors: {
      background: tw.color("aiso-gray"),
      primary: tw.color("aiso-blue"),
      card: tw.color("aiso-gray"),
      text: tw.color("white"),
      border: tw.color("black"),
      notification: tw.color("aiso-blue"),
    },
  };

  useEffect(() => {
    if (getAuth(app).currentUser && !socket.connected) {
      socket.auth = { deviceType: "user" };
      socket.auth.name = getAuth(app).currentUser.email;
      socket.connect();
    }
    async function getUser() {
      const querySnap = await getDoc(
        doc(db, "users", getAuth(app).currentUser.uid)
      );
      return querySnap.data();
    }
    getUser().then((result) => {
      setUsername(result.name);
    });
  }, []);

  return (
    <NavigationContainer theme={globalTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Remote") {
              iconName = "remote-tv";
            } else if (route.name === "Devices") {
              iconName = "robot-industrial";
            } else if (route.name === "Models") {
              iconName = "star-box-multiple";
            } else if (route.name === "Preferences") {
              iconName = "account-settings";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: tw.color("aiso-blue"),
          tabBarInactiveTintColor: tw.color("white"),
        })}
      >
        <Tab.Screen name="Remote" component={RemoteScreen} />
        <Tab.Screen name="Devices" component={DevicesScreen} />
        <Tab.Screen name="Models" component={ModelsScreen} />
        <Tab.Screen name="Preferences" component={PreferencesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({});
