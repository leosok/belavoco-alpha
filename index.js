/** @format */

import { AppRegistry, DeviceEventEmitter } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import PlayerStore, { playbackStates, playbackType } from './src/stores/Player';

import App from './App';
import { name as appName } from './app.json';

let i = 0;

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerEventHandler(async (data) => {
    if (data.type === 'playback-state') {
        // PlayerStore.playbackType = data.type;
        PlayerStore.playbackState = data.state;
    } 
    if (data.type === 'playback-queue-ended') {
        i = i + 1;
        PlayerStore.playbackType = data.type;
        // Makes sure, that Queue ended is only called at the end of a Queue (see playerUtils.resetAndPlay()) 
        // --> Fix for unexpected bhavior
        if (i % 2 !== 0) {
            DeviceEventEmitter.emit('playFinished', 'FINISHED');
        }
    }
  });

