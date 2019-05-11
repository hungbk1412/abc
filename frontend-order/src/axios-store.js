import Axios from "axios";

const instance = Axios.create({
    // baseURL: 'http://192.168.31.242:5000',
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

export default instance;