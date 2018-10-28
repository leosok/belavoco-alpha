// import RNAudioStreamer from 'react-native-audio-streamer';
import { AsyncStorage } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import settings from '../../settings';

const BACKEND_HOST = settings.getBackendHost().concat('/api/get/');

let length = 0;
let position = 0;
let progress = 0;

const playerUtils = {
    async resetAndPlay(audiobooks, audioBookToPlay) {
        const playlist = await playerUtils.makePlaylistArray(audiobooks, audioBookToPlay);
        console.log(playlist);
        // Creates the player

        //TODO: Reset führt zu einem "Queue ended"-event. Daher deaktiviert. Falls es ein Problem ist (Mixup in Playlist), muss Alternative gefunden werden.
        await TrackPlayer.reset();
        await TrackPlayer.add(playlist);
        await TrackPlayer.skip(audioBookToPlay.hash);
        await TrackPlayer.play();
    },
    playAudioBook() {
        console.log('playerUtils.playAudioBook()');
        // RNAudioStreamer.play();
    },
    pauseAudioBook() {
        console.log('playerUtils.pauseAudioBook()');
        // RNAudioStreamer.pause();
    },
    async getState() {
        const state = await TrackPlayer.getState();
        console.log('playerUtils.getState(): ' + state);
        // RNAudioStreamer.pause();
    },
    getProgress() {
        // console.log('playerUtils.getProgress()');
        // RNAudioStreamer.duration((err, duration) => {
        //     length = duration;
        //    });

        // RNAudioStreamer.currentTime((err, currentTime) => {
        //     position = currentTime;
        // });
        if (length > 0) {
            progress = (position / length);
        }
        return [progress, position, length];
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
            track.url = playerUtils.makeFileUrl(audioBookToPlay.hash), // Load media from the network
            track.title = audioBookToPlay.title,
            track.artist = audioBookToPlay.author,
            tracks.push(track);
        } else {
            let i;
            for (i = 0; i < Object.keys(audiobooks).length; i++) {
                const track = {};
                track.id = audiobooks[i].hash,
                track.url = playerUtils.makeFileUrl(audiobooks[i].hash), // Load media from the network
                track.title = audiobooks[i].title,
                track.artist = audiobooks[i].author,
                tracks.push(track);
            }
        }
        return tracks;
    },
    makeFileUrl(hash) {
        const fileUrl = BACKEND_HOST.concat(hash, '/play');
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

