import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, Alert, TextInput } from "react-native";
import Button from "../components/Button/Button";

import socket from "../../socket";

import { devices } from "../recoil/atoms/deviceAtom";
import { useRecoilState } from "recoil";

import tw from "../../lib/tailwind";

const DevicesScreen = () => {
  //const [allDevices, setAllDevices] = useState([]);
  const [allDevices, setAllDevices] = useRecoilState(devices);
  console.log(allDevices);

  useFocusEffect(
    useCallback(() => {
      socket.emit("get-bots", (response) => {
        setAllDevices([...response.data]);
        console.log(response);
      });
      socket.on("bots", (bots) => {
        //console.log(bots);
        setAllDevices([...bots]);
        //console.log(allDevices);
      });
      socket.onAny((event, ...args) => {
        console.log(event, args);
      });

      return () => {
        socket.off("bots");
      };
    }, [])
  );

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      {allDevices.map((device, index) => {
        return (
          <Text key={index} style={tw`text-white`}>
            {device.id + " || " + device.name}
          </Text>
        );
      })}
    </View>
  );
};

export default DevicesScreen;

const styles = StyleSheet.create({});
