import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Header } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function settingsPage() {
  const [Region, setRegion] = useState(getRegion);
  const setNewRegion = async (region) => {
    setRegion(region);
    try {
      await AsyncStorage.setItem("Region", region);
    } catch (e) {
      console.log(e);
    }
    console.log(region);
  };
  const getRegion = async () => {
    try {
      region = await AsyncStorage.getItem("Region");
    } catch (e) {
      console.log(e);
    }
    setRegion(region);
    return region;
  };
  getRegion();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Header
            centerComponent={{text: 'Settings', style: {color: 'darkblue', fontWeight: 'bold', fontSize: 30}}}
            containerStyle={{
                backgroundColor: 'orange',
            }}
        />
      <Text>Regio aanpassen</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 4,
          width: 150,
        }}
      >
        <Picker
          selectedValue={Region}
          onValueChange={(itemValue) => setNewRegion(itemValue)}
        >
          <Picker.Item label="noord" value="Noord" />
          <Picker.Item label="midden" value="Midden" />
          <Picker.Item label="zuid" value="Zuid" />
        </Picker>
      </View>
    </View>
  );
}