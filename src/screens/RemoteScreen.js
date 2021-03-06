import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import tw from "../../lib/tailwind";

import { currentDevice } from "../recoil/atoms/deviceAtom";
import { useRecoilState } from "recoil";

import ConnectionStatus from "../components/Common/ConnectionStatus";
import PadButton from "../components/Common/PadButton";
import socket from "../../socket";

const RemoteScreen = ({ navigation, route }) => {
  const [disabled, setDisabled] = useState(true);
  const [device, setDevice] = useState(null);
  const [pickedUp, setPickedUp] = useState(false);
  const [currDevice, setCurrDevice] = useRecoilState(currentDevice);

  const disconnectBot = (currentDevice) => {
    if (currentDevice != null) {
      socket.emit("deselect-bot", currentDevice.id, (response) => {
        if (response.status == "ok") {
          route.params = null;
          setDevice(null);
        }
      });
      setCurrDevice(null);
    }
  };

  const performAction = (action, currentDevice) => {
    switch (action) {
      case "up":
        socket.emit("move-up", currentDevice.id);
        break;
      case "down":
        socket.emit("move-down", currentDevice.id);
        break;
      case "left":
        socket.emit("move-left", currentDevice.id);
        break;
      case "right":
        socket.emit("move-right", currentDevice.id);
        break;
      case "e-stop":
        socket.emit("e-stop", currentDevice.id);
        break;
      case "sort":
        socket.emit("sort", currentDevice.id);
        break;
      case "pickup":
        pickedUp
          ? socket.emit("put-down", currentDevice.id)
          : socket.emit("pick-up", currentDevice.id);
        setPickedUp(!pickedUp);
        break;
      default:
        break;
    }
  };

  useFocusEffect(
    useCallback(() => {
      setDevice(route.params ? route.params.device : null);
      device != null ? setDisabled(false) : setDisabled(true);
      device != null ? setCurrDevice(device) : setCurrDevice(null);
      socket.on("bot-crash", () => {
        route.params = null;
        setDevice(null);
        setCurrDevice(null);
      });
    }, [route, disabled, device, pickedUp])
  );
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View style={tw`flex items-start justify-center`}>
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
        <PadButton
          icon={"up"}
          disabled={disabled}
          onPress={() => performAction("up", device)}
        />
        <View style={tw`flex-row justify-evenly px-2 py-2 w-100`}>
          <PadButton
            icon={"left"}
            disabled={disabled}
            onPress={() => performAction("left", device)}
          />
          <PadButton
            icon={"pickup"}
            disabled={disabled}
            onPress={() => performAction("pickup", device)}
          />
          <PadButton
            icon={"right"}
            disabled={disabled}
            onPress={() => performAction("right", device)}
          />
        </View>

        <PadButton
          icon={"down"}
          disabled={disabled}
          onPress={() => performAction("down", device)}
        />
      </View>
      <View style={tw`flex items-center px-2 py-2`}>
        <View style={tw`flex-row justify-evenly px-2 py-2 w-100`}>
          <PadButton
            icon={"disconnect"}
            disabled={disabled}
            onPress={() => disconnectBot(device)}
          />
          <PadButton
            icon={"sort"}
            disabled={disabled}
            onPress={() => performAction("sort", device)}
          />
          <PadButton
            icon={"estop"}
            disabled={disabled}
            onPress={() => performAction("e-stop", device)}
          />
        </View>
      </View>
    </View>
  );
};

export default RemoteScreen;

const styles = StyleSheet.create({});
