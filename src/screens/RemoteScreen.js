import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import tw from "../../lib/tailwind";

import ConnectionStatus from "../components/Common/ConnectionStatus";
import PadButton from "../components/Common/PadButton";
import socket from "../../socket";

const RemoteScreen = ({ navigation, route }) => {
  const [disabled, setDisabled] = useState(true);
  const [device, setDevice] = useState(null);

  const disconnectBot = (currentDevice) => {
    if (currentDevice != null) {
      socket.emit("deselect-bot", currentDevice.id, (response) => {
        if (response.status == "ok") {
          route.params = null;
          setDevice(null);
        }
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setDevice(route.params ? route.params.device : null);
      device != null ? setDisabled(false) : setDisabled(true);
      socket.on("bot-crash", () => {
        route.params = null;
        setDevice(null);
      });
    }, [route, disabled, device])
  );
  return (
    <View>
      <View style={tw`flex-1 items-center justify-center`}>
        {device != null ? (
          <ConnectionStatus
            connected={true}
            device={device.name}
            id={device.id}
          ></ConnectionStatus>
        ) : (
          <ConnectionStatus connected={false} id={0}></ConnectionStatus>
        )}
      </View>
      <View style={tw`flex items-center justify-evenly px-2 py-2 h-80`}>
        <PadButton icon={"up"} disabled={disabled} />
        <View style={tw`flex-row items-center justify-evenly px-2 py-2 w-100`}>
          <PadButton icon={"left"} disabled={disabled} />
          <PadButton icon={"default"} disabled={disabled} />
          <PadButton icon={"right"} disabled={disabled} />
        </View>

        <PadButton icon={"down"} disabled={disabled} />
      </View>
      <View style={tw`flex items-center justify-around px-2 py-2 h-80`}>
        <View style={tw`flex-row items-end justify-evenly px-2 py-2 w-100`}>
          <PadButton
            icon={"disconnect"}
            disabled={disabled}
            onPress={() => disconnectBot(device)}
          />
          <PadButton icon={"stop"} disabled={disabled} />
        </View>
      </View>
    </View>
  );
};

export default RemoteScreen;

const styles = StyleSheet.create({});
