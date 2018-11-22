const audiobookUtils = {
    getRandomAudiobook(audiobooks, lastID) {
        var newPlaylist = audiobooks.filter((_, i) => i !== lastID);
        const randomNumber = Math.floor(Math.random() * (audiobooks.length - 1));
        const randomAudiobook = audiobooks[randomNumber];
        return [randomAudiobook, newPlaylist];
    },
    function5() {
        console.log(5);
    },
    function6() {
        console.log(6);
    },
};

export default audiobookUtils;

