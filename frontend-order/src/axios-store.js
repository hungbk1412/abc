import Axios from "axios";
import {storeApi} from './constant'

const instance = Axios.create({
    baseURL: storeApi,
    withCredentials: true
});

export default instance;