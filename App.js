import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import OneSignal from 'react-native-onesignal';

import AppNavigator from './src/navigation/AppNavigator';
import settings from './settings';

export default class App extends Component {

  state = {
    promptValue: '',
    visiblePrompt: true,
  };

  componentWillMount() {
    OneSignal.init(settings.getOneSignalKey());

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    OneSignal.configure();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
    if (device.userId !== null) {
      //This if makes sure, that the App does not crash on very first return
      AsyncStorage.setItem('onesignalplayid', device.userId);
    }
  }

  render() {
    return (
      <AppNavigator />
    );
  }
}
