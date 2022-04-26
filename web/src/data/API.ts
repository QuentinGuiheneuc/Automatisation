import axios from 'axios';

export default axios.create({
    baseURL: `http://192.168.1.39:3007/`,
    headers: {
        'Content-Type': 'application/json'
    }
});