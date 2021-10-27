import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, Alert, TextInput } from "react-native";
import Button from "../components/Common/Button";

import socket from "../../socket";

import { devices } from "../recoil/atoms/deviceAtom";
import { useRecoilState } from "recoil";

import tw from "../../lib/tailwind";
import DeviceChip from "../components/Common/DeviceChip";

const DevicesScreen = ({ navigation }) => {
  const [allDevices, setAllDevices] = useRecoilState(devices);

  useFocusEffect(
    useCallback(() => {
      socket.emit("get-bots", (response) => {
        setAllDevices([...response.data]);
      });
      socket.on("bots", (bots) => {
        setAllDevices([...bots]);
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
          <DeviceChip
            key={index}
            name={device.name}
            deviceID={device.id}
            onPress={() => navigation.navigate("Remote", { device: device })}
          ></DeviceChip>
        );
      })}
    </View>
  );
};

export default DevicesScreen;

const styles = StyleSheet.create({});
