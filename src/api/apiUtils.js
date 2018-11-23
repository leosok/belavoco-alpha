import axios from 'axios';
import TrackPlayer from 'react-native-track-player';
import DeviceInfo from 'react-native-device-info';

import settings from '../../settings';
import utils from '../utils/utils';
import playerUtils from '../player/playerUtils';

const API_ENDPOINT_AUDIOBOOK = settings.getBackendHost().concat('/api/set/');
const API_ENDPOINT_UPDATE_USER = settings.getBackendHost().concat('/api/user');
const API_ENDPOINT_USER_VERSION = settings.getBackendHost().concat('/api/user/version');
const API_ENDPOINT_COMMENT = settings.getBackendHost().concat('/api/comment/');
const API_ENDPOINT_FEEDBACK = settings.getBackendHost().concat('/api/feedback/');
//TODO: Beeceptor configuration in settings.js
//For Testing:
// const API_ENDPOINT_UPDATE_USER = 'https://belavoco.free.beeceptor.com';

const apiUtils = {
    async addLike(hash) {
        const userhash = await utils.getUserParameter('hash');
        apiUtils.transmitUserHash(API_ENDPOINT_AUDIOBOOK.concat(hash, '/like'), userhash);
    },
    async substractLike(hash) {
        const userhash = await utils.getUserParameter('hash');
        apiUtils.transmitUserHash(API_ENDPOINT_AUDIOBOOK.concat(hash, '/unlike'), userhash);
    },
    async addLikeComment(hash) {
        const userhash = await utils.getUserParameter('hash');
        apiUtils.transmitUserHash(API_ENDPOINT_AUDIOBOOK.concat(hash, '/comment/like'), userhash);
    },
    async substractLikeComment(hash) {
        const userhash = await utils.getUserParameter('hash');
        apiUtils.transmitUserHash(API_ENDPOINT_AUDIOBOOK.concat(hash, '/comment/unlike'), userhash);
    },
    //TODO: Rebuild with axios
    transmitUserHash(endpoint, userhash) {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': userhash,
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                user: {
                    user_hash: userhash,
                },
            })
        });
    },
    updateUserData(userdata) {
        const data = { user: userdata };
        axios.put(API_ENDPOINT_UPDATE_USER, data, {
            headers: this.getRequestHeader(userdata.userhash),
        })
        .catch(e => console.log(e));
    },
    getRequestHeader(userhash) {
        const myheaders = {
            'Authorization': userhash,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        return (myheaders);
    },
    transmitComment(trackhash, userhash, comment) {
        const endpoint = API_ENDPOINT_COMMENT.concat(trackhash);
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': userhash,
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                comment
            })
        });
    },
    deleteComment(userhash, commentId) {
        const endpoint = API_ENDPOINT_COMMENT.concat(commentId);
        fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Authorization': userhash,
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
            // body: JSON.stringify({
            //     comment
            // })
        });
    },
    async sendPlayCount() {
        const trackhash = await TrackPlayer.getCurrentTrack();
        const userhash = await utils.getUserParameter('hash');
        if (trackhash) {
          fetch(playerUtils.makeFileUrl(trackhash), {
              method: 'PUT',
              headers: this.getRequestHeader(userhash)
          });
        }
    },
    transmitFeedback(userhash, feedback) {
        console.log('transmitFeedback userhash: ' + userhash);
        console.log('transmitFeedback feedback: ' + feedback);
        // fetch(API_ENDPOINT_FEEDBACK, {
        //     method: 'POST',
        //     headers: this.getRequestHeader(userhash),
        //     body: JSON.stringify({
        //         feedback
        //     })
        // });
    },
    async transmitVersionInfo() {
        const userhash = await utils.getUserParameter('hash');
        const systemName = DeviceInfo.getSystemName();
        const buildVersion = DeviceInfo.getVersion();
        fetch(API_ENDPOINT_USER_VERSION, {
            method: 'PUT',
            headers: this.getRequestHeader(userhash),
            body: JSON.stringify({
            version: {
                system: systemName,
                build_version: buildVersion,
                },
            })
        });
    },
    async toggleActivity(trackhash) {
        console.log('TOGGLE ACTIVITY!!!!!!!!!!!!!');
        console.log(trackhash);
        const userhash = await utils.getUserParameter('hash');
        const endpoint = API_ENDPOINT_AUDIOBOOK.concat(trackhash, '/activity');
        fetch(endpoint, {
            method: 'UPDATE',
            headers: {
                'Authorization': userhash,
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
        });
    },
    async updateAuthor(trackhash, author) {
        console.log('Update AUthor!!!');
        console.log(trackhash);
        console.log(author);
        const userhash = await utils.getUserParameter('hash');
        const endpoint = API_ENDPOINT_AUDIOBOOK.concat(trackhash, '/author');
        fetch(endpoint, {
            method: 'PUT',
            headers: this.getRequestHeader(userhash),
            body: JSON.stringify({
                new_author: author,
            })
        });
    },
    async updateTitle(trackhash, title) {
        console.log('Update Title!!!');
        console.log(trackhash);
        console.log(title);
        const userhash = await utils.getUserParameter('hash');
        const endpoint = API_ENDPOINT_AUDIOBOOK.concat(trackhash, '/title');
        fetch(endpoint, {
            method: 'PUT',
            headers: this.getRequestHeader(userhash),
            body: JSON.stringify({
                new_title: title,
            })
        });
    },
    function8() {
        console.log(7);
    },
    function9() {
        console.log(7);
    },
};

export default apiUtils;
