/** @format */

import { AppRegistry, DeviceEventEmitter } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import PlayerStore, { playbackStates, playbackType } from './src/stores/Player';
import TrackStore from './src/stores/Track';

import App from './App';
import { name as appName } from './app.json';

let i = 0;

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerEventHandler(async (data) => {
    if (data.type === 'playback-track-changed') {
        if (data.nextTrack) {
          const track = await TrackPlayer.getTrack(data.nextTrack);
          TrackStore.title = track.title;
          TrackStore.artist = track.artist;
          TrackStore.artwork = track.artwork;
        }
      } else if (data.type === 'remote-play') {
            TrackPlayer.play();
      } else if (data.type === 'remote-pause') {
          TrackPlayer.pause();
    //   } else if(data.type == 'remote-next') {
    //     TrackPlayer.skipToNext()
    //   } else if(data.type == 'remote-previous') {
    //     TrackPlayer.skipToPrevious()
      } else if (data.type === 'playback-state') {
        PlayerStore.playbackState = data.state;
      }
    if (data.type === 'playback-queue-ended') {
      console.log('QUEUE ENDED!!!!');
      i = i + 1;
      PlayerStore.playbackType = data.type;
      // Makes sure, that Queue ended is only called at the end of a Queue (see playerUtils.resetAndPlay()) 
      // --> Fix for unexpected bhavior
      if (i % 2 !== 0) {
        DeviceEventEmitter.emit('playFinished', 'FINISHED');
      }
    }
});

