import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

// Recoil
import { useSetRecoilState } from "recoil";
import { username } from "../recoil/atoms/userAtom";

// Firebase
import { app, db } from "../../firebase";
import { getDoc, doc } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

// Utils
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "../../lib/tailwind";

// Screens
import DevicesScreen from "./DevicesScreen";
import RemoteScreen from "./RemoteScreen";
import PreferencesScreen from "./PreferencesScreen";

const UserHomeScreen = () => {
  const Tab = createBottomTabNavigator();
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
  const setUsername = useSetRecoilState(username);

  useEffect(() => {
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
        <Tab.Screen name="Preferences" component={PreferencesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({});
