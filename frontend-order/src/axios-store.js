import Axios from "axios";
import {storeApi} from './constant'

const instance = Axios.create({
    // baseURL: 'http://192.168.31.242:5000',
    baseURL: storeApi,
    withCredentials: true
});

export default instance;