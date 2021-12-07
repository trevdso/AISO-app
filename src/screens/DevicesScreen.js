import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import socket from "../../socket";

import { devices, currentDevice } from "../recoil/atoms/deviceAtom";
import { useRecoilState, useRecoilValue } from "recoil";

import tw from "../../lib/tailwind";
import DeviceChip from "../components/Common/DeviceChip";
import { selectedModel } from "../recoil/atoms/modelAtom";

const DevicesScreen = ({ navigation }) => {
  const [allDevices, setAllDevices] = useRecoilState(devices);
  const [currDevice, setCurrDevice] = useRecoilState(currentDevice);
  const model = useRecoilValue(selectedModel);

  const selectDevice = (currentDevice) => {
    socket.emit("select-bot", currentDevice.id, (response) => {
      console.log(response.status);
    });
    setCurrDevice(currentDevice);
    navigation.navigate("Remote", { device: currentDevice });
  };

  useFocusEffect(
    useCallback(() => {
      socket.emit("get-bots", (response) => {
        setAllDevices([...response.data]);
      });
      socket.on("bots", (bots) => {
        setAllDevices([...bots]);
      });

      return () => {
        socket.off("bots");
      };
    }, [])
  );

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      {allDevices.length != 0 ? (
        allDevices.map((device, index) => {
          return (
            <DeviceChip
              key={index}
              name={device.name}
              deviceID={device.id}
              onPress={() => selectDevice(device)}
            ></DeviceChip>
          );
        })
      ) : (
        <View style={tw`bg-red-700 flex-row items-center rounded-sm`}>
          <Text style={tw`text-white p-2`}>No available devices found</Text>
        </View>
      )}
    </View>
  );
};

export default DevicesScreen;

const styles = StyleSheet.create({});
