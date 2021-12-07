import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Recoil
import { useSetRecoilState, useRecoilValue } from "recoil";
import { selectedModel } from "../recoil/atoms/modelAtom";
import { currentDevice } from "../recoil/atoms/deviceAtom";

import tw from "../../lib/tailwind";
import ModelChip from "../components/Common/ModelChip";

const ModelsScreen = ({ navigation }) => {
  const [models, setModels] = useState([]);
  const setSelectedModel = useSetRecoilState(selectedModel);
  const device = useRecoilValue(currentDevice);

  useFocusEffect(
    useCallback(() => {
      console.log(device);
      //setDevice(route.params ? route.params.device : null);
      setModels([
        { name: "Fruit", id: 1 },
        { name: "Parts", id: 2 },
      ]);
    }, [device])
  );

  // globally set selected model
  // socket io emit sort with modelname
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      {models.length > 0 ? (
        models.map((model, index) => {
          return (
            <ModelChip
              key={index}
              name={model.name}
              deviceID={model.id}
              onPress={() => {
                setSelectedModel(model.name);
                navigation.navigate("Remote", { device: device });
              }}
            ></ModelChip>
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

export default ModelsScreen;

const styles = StyleSheet.create({});
