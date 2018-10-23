import { ONESIGNAL_API_KEY_LOCAL } from './environ';

let ONESIGNAL_API_KEY = '$ONESIGNAL_API_KEY';
const BACKEND_HOST = 'https://www.belavo.co';
const BACKEND_HOST_DEBUG = 'http://192.168.1.4:5000';

const DEBUG = true;
// const DEBUG = false;

const settings = {
    getOneSignalKey() {
        if (ONESIGNAL_API_KEY === '$ONESIGNAL_API_KEY') {
            ONESIGNAL_API_KEY = ONESIGNAL_API_KEY_LOCAL;
        }
        return ONESIGNAL_API_KEY;
    },
    getBackendHost() {
        if (DEBUG) {
            return BACKEND_HOST_DEBUG;
        }
        return BACKEND_HOST;
    },
    getDebugState() {
        return DEBUG;
    },
    function6() {
        console.log(6);
    },
};

export default settings;
