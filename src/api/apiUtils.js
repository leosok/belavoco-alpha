import axios from 'axios';

import settings from '../../settings';
import utils from '../utils/utils';

const API_ENDPOINT_LIKE = settings.getBackendHost().concat('/api/set/');
const API_ENDPOINT_UPDATE_USER = settings.getBackendHost().concat('/api/user');
const API_ENDPOINT_TRANSMIT_COMMENT = settings.getBackendHost().concat('/api/comment');
//TODO: Beeceptor configuration in settings.js
//For Testing:
// const API_ENDPOINT_UPDATE_USER = 'https://belavoco.free.beeceptor.com';

const apiUtils = {
    async addLike(hash) {
        const userhash = await utils.getUserParameter('hash');
        apiUtils.transmitUserHash(API_ENDPOINT_LIKE.concat(hash, '/like'), userhash);
    },
    async substractLike(hash) {
        const userhash = await utils.getUserParameter('hash');
        apiUtils.transmitUserHash(API_ENDPOINT_LIKE.concat(hash, '/unlike'), userhash);
    },
    async addLikeComment(hash) {
        const userhash = await utils.getUserParameter('hash');
        apiUtils.transmitUserHash(API_ENDPOINT_LIKE.concat(hash, '/comment/like'), userhash);
    },
    async substractLikeComment(hash) {
        const userhash = await utils.getUserParameter('hash');
        apiUtils.transmitUserHash(API_ENDPOINT_LIKE.concat(hash, '/comment/unlike'), userhash);
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
          };
        return (myheaders);
    },
    transmitComment(userhash, comment) {
        fetch(API_ENDPOINT_TRANSMIT_COMMENT, {
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
    function9() {
        console.log(7);
    },
};

export default apiUtils;
