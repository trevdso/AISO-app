import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "./lib/tailwind";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Screens
import DevicesScreen from "./src/screens/DevicesScreen";
import RemoteScreen from "./src/screens/RemoteScreen";

const App = () => {
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
