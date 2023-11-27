import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://192.168.100.9:8000'
});

export default AxiosInstance;