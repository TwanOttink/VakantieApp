import React from "react";
import { Text, View } from "react-native";
import { Header } from "react-native-elements";

export default function aboutPage() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Header
            centerComponent={{text: 'About', style: {color: 'darkblue', fontWeight: 'bold', fontSize: 30}}}
            containerStyle={{
                backgroundColor: 'orange',
            }}
        />
      <Text>About!!</Text>
    </View>
  );
}