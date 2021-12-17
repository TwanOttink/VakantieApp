import React from "react";
import { Text, View } from "react-native";
import { Header } from "react-native-elements";

export default function settingsPage() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Header
            centerComponent={{text: 'Settings', style: {color: 'darkblue', fontWeight: 'bold', fontSize: 30}}}
            containerStyle={{
                backgroundColor: 'orange',
            }}
        />
      <Text>Settings</Text>
    </View>
  );
}