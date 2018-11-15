// import RNAudioStreamer from 'react-native-audio-streamer';
import { AsyncStorage } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import settings from '../../settings';

const BACKEND_HOST = settings.getBackendHost().concat('/api/get/');

const playerUtils = {
    async resetAndPlay(audiobooks, audioBookToPlay) {
        const playlist = await playerUtils.makePlaylistArray(audiobooks, audioBookToPlay);
        // console.log('Playlist: ' + playlist);
        // Creates the player

        TrackPlayer.reset();
        TrackPlayer.add(playlist).then(() => {
            TrackPlayer.skip(audioBookToPlay.hash);
            TrackPlayer.play();
        });
    },
    async getState() {
        const state = await TrackPlayer.getState();
        console.log('playerUtils.getState(): ' + state);
        // RNAudioStreamer.pause();
    },
    async forwardThirty() {
        const newPosition = await TrackPlayer.getPosition() + 30;
        TrackPlayer.seekTo(newPosition);
    },
    async rewindThirty() {
        const newPosition = await TrackPlayer.getPosition() - 30;
        TrackPlayer.seekTo(newPosition);
    },
    async loadAutoplayStatus() {
        let autoplayStatus = await AsyncStorage.getItem('autoplay');
        if (autoplayStatus === 'true') {
            autoplayStatus = true;
          } else {
            autoplayStatus = false;
          }
        return autoplayStatus;
    },
    async makePlaylistArray(audiobooks, audioBookToPlay) {
        const autoplayState = await playerUtils.loadAutoplayStatus();
        const tracks = [];
        if (!autoplayState) {
            const track = {};
            track.id = audioBookToPlay.hash,
            track.url = playerUtils.makeFileUrl(audioBookToPlay.hash, audioBookToPlay.file_name), // Load media from the network
            track.title = audioBookToPlay.title,
            track.artist = audioBookToPlay.author,
            tracks.push(track);
        } else {
            let i;
            for (i = 0; i < Object.keys(audiobooks).length; i++) {
                const track = {};
                track.id = audiobooks[i].hash,
                track.url = playerUtils.makeFileUrl(audiobooks[i].hash, audiobooks[i].file_name), // Load media from the network
                track.title = audiobooks[i].title,
                track.artist = audiobooks[i].author,
                tracks.push(track);
            }
        }
        return tracks;
    },
    makeFileUrl(hash, fileName) {
        let ending = '';
        // Generating a audiofile specific suffix for the play call. Empty ending is for the sendPlayCount API call
        if (fileName) {
            ending = '.'.concat(fileName.split('.').pop());
        }
        console.log(ending);
        const fileUrl = BACKEND_HOST.concat(hash, '/play', ending);
        console.log(fileUrl);
        return fileUrl;
    },
    function6() {
        console.log(6);
    },
    function7() {
        console.log(6);
    },
    function8() {
        console.log(6);
    },
};

export default playerUtils;

