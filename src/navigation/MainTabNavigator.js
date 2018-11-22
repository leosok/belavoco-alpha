import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import RecorderScreen from '../screens/RecorderScreen';
import MediaScreen from '../screens/MediaScreen';
import SettingsScreen from '../screens/SettingsScreen';

const RecorderStack = createStackNavigator({
  Recorder: RecorderScreen,
});

RecorderStack.navigationOptions = {
  tabBarLabel: 'Aufnahme',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type='ionicon'
      name={
        Platform.OS === 'ios'
        ? 'ios-mic'
        : 'md-mic'
      }
    />
  ),
};

const MediaStack = createStackNavigator({
  Media: MediaScreen,
});

MediaStack.navigationOptions = {
  tabBarLabel: 'Hörbücher',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type='ionicon'
      name={
        Platform.OS === 'ios'
          ? 'ios-headset'
          : 'md-headset'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type='ionicon'
      name={
        Platform.OS === 'ios'
          ? 'ios-build'
          : 'md-build'
      }
    />
  ),
};

export default createBottomTabNavigator({
  // MediaStack,
  RecorderStack,
  SettingsStack
});
