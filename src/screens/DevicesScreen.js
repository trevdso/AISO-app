import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Alert, TextInput } from "react-native";
import Button from "../components/Button/Button";

import { io } from "socket.io-client";

import tw from "../../lib/tailwind";

const socket = io("http://localhost:3000/");

const DevicesScreen = () => {
  const [input, setInput] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [allDevices, setAllDevices] = useState([]);

  const sendMessage = () => {
    console.log(input);
    setAllMessages((oldMessages) => [...oldMessages, input]);
    console.log(allMessages);
    socket.emit("chat message", input);
    setInput("");
  };

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setAllMessages((oldMessages) => [...oldMessages, msg]);
      console.log(msg);
      console.log(allMessages);
    });
    socket.on("getAllOnlineDevices", (allDevices) => {
      setAllDevices([...allDevices]);
      console.log(allDevices);
    });

    socket.emit("getAllOnlineDevices");
    return () => {
      socket.off("chat message");
      socket.off("getAllDevices");
    };
  }, []);

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      {allDevices.map((device, index) => {
        return (
          <View>
            <Text key={index} style={tw`text-white`}>
              {device}
            </Text>
          </View>
        );
      })}
      {allMessages.map((msg, index) => {
        return (
          <View>
            <Text key={index} style={tw`text-white`}>
              {msg}
            </Text>
          </View>
        );
      })}
      <TextInput
        style={{ height: 40, borderWidth: 2, top: 600, color: "white" }}
        autoCorrect={false}
        value={input}
        onSubmitEditing={sendMessage}
        onChangeText={setInput}
      />
      <Button title="Test!" onPress={sendMessage} />
    </View>
  );
};

export default DevicesScreen;

const styles = StyleSheet.create({});
