// import RNAudioStreamer from 'react-native-audio-streamer';
import { AsyncStorage } from 'react-native';
import TrackPlayer from 'react-native-track-player';

let length = 0;
let position = 0;
let progress = 0;

const playerUtils = {
    startAudioBook(audiobookURL) {
        console.log('playerUtils.startAudioBook()');
        //Creates the player
        TrackPlayer.setupPlayer().then(async () => {
            // Adds a track to the queue
            await TrackPlayer.add({
                id: 'trackId',
                url: audiobookURL,
                title: 'Track Title',
                artist: 'Track Artist',
                artwork: 'https://www.cts-reisen.de/_Resources/Persistent/c088016fa7a93ea0d33b66c33e0d2a0dbff56ffe/GR-Gruppenreisen-Athen-Parthenon-Tempel-4134x2326-1280x720.jpg'
            });
            // Starts playing it
            TrackPlayer.play();
        });


        // RNAudioStreamer.setUrl(audiobookURL);
        // RNAudioStreamer.play();
    },
    playAudioBook() {
        console.log('playerUtils.playAudioBook()');
        // RNAudioStreamer.play();
    },
    pauseAudioBook() {
        console.log('playerUtils.pauseAudioBook()');
        // RNAudioStreamer.pause();
    },
    getProgress() {
        console.log('playerUtils.getProgress()');
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
    function5() {
        console.log(5);
    },
    function6() {
        console.log(6);
    },
};

export default playerUtils;

