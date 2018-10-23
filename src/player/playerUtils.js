// import RNAudioStreamer from 'react-native-audio-streamer';
import { AsyncStorage } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import settings from '../../settings';

const BACKEND_HOST = settings.getBackendHost().concat('/api/get/');

let length = 0;
let position = 0;
let progress = 0;

const playerUtils = {
    setupAndPlay(playlist, idToPlay) {
        //Creates the player
        TrackPlayer.setupPlayer().then(async () => {
            // Adds a track to the queue
            await TrackPlayer.add(playlist).then(function() {
                // The tracks were added
                console.log('in TrackPlayer.add');
                console.log(TrackPlayer.getQueue());
            });
            // Starts playing it
            console.log('UserHash: ' + idToPlay);
            TrackPlayer.skip(idToPlay);
            TrackPlayer.play();
        });
    },
    // startAudioBook(audiobookURL) {
    //     console.log('playerUtils.startAudioBook()');
    //     //Creates the player
    //     TrackPlayer.setupPlayer().then(async () => {
    //         // Adds a track to the queue
    //         await TrackPlayer.add({
    //             id: 'trackId',
    //             url: audiobookURL,
    //             title: 'Track Title',
    //             artist: 'Track Artist',
    //             artwork: 'https://www.cts-reisen.de/_Resources/Persistent/c088016fa7a93ea0d33b66c33e0d2a0dbff56ffe/GR-Gruppenreisen-Athen-Parthenon-Tempel-4134x2326-1280x720.jpg'
    //         });
    //         // Starts playing it
    //         TrackPlayer.play();
    //     });


        // RNAudioStreamer.setUrl(audiobookURL);
        // RNAudioStreamer.play();
    // },
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
    makePlaylistArray(audiobooks) {
        const tracks = [];
        let i;
        for (i = 0; i < Object.keys(audiobooks).length; i++) {
        // for (i = 6; i < 8; i++) {
            const track = {};
            track.id = audiobooks[i].hash,
            track.url = playerUtils.makeFileUrl(audiobooks[i].hash), // Load media from the network
            track.title = audiobooks[i].title,
            track.artist = audiobooks[i].author,
            tracks.push(track);
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

