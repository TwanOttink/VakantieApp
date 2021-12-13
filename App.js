import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import homePage from './components/pages/homePage';
import countdownPage from './components/pages/countdownPage';
import settingsPage from './components/pages/settingsPage';
import aboutPage from './components/pages/aboutPage';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
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
