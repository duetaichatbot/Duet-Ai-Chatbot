import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://192.168.1.108:8000'
});

export default AxiosInstance;