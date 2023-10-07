import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://192.168.88.223:8000'
});

export default AxiosInstance;