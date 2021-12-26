import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import homePage from './components/pages/homePage';
import countdownPage from './components/pages/countdownPage';
import settingsPage from './components/pages/settingsPage';
import aboutPage from './components/pages/aboutPage';

const Tab = createMaterialBottomTabNavigator();

const init = async () => {
  // const value = await AsyncStorage.removeItem("Region");
  try {
    const value = await AsyncStorage.getItem("Region");
    if (value !== null) {
    } else {
      setRegion();
    }
  } catch (e) {
    console.log(e);
  }
};

const setRegion = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "je hebt toegang") {
    console.log("Je hebt geen toegang");
  }

  const userLocation = await Location.getCurrentPositionAsync();
  console.log(userLocation);
  let region = "";
  if (userLocation.coords.latitude >= 53) {
    region = "noord";
  }
  if (userLocation.coords.latitude < 53) {
    region = "midden";
  }
  if (userLocation.coords.latitude <= 52) {
    region = "zuid";
  }
  try {
    await AsyncStorage.setItem("Region", region);
  } catch (e) {
    console.log(e);
  }
};

export default function App() {
  init();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Countdown') {
              iconName = focused
                ? 'stopwatch'
                : 'stopwatch-outline';
            } else if (route.name === 'Settings') {
              iconName = focused
                ? 'settings'
                : 'settings-outline';
            } else if (route.name === 'About') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
        })}
        barStyle={{ backgroundColor: 'darkblue' }}
      >
        <Tab.Screen name="Home" component={homePage} />
        <Tab.Screen name="Countdown" component={countdownPage} />
        <Tab.Screen name="Settings" component={settingsPage} />
        <Tab.Screen name="About" component={aboutPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
