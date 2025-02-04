import axios from 'axios';
import { config } from 'process';

const axiosInstance = axios.create({
    baseURL : 'http:localhost:3001',
    timeout : 5000
})

axiosInstance.interceptors.request.use(
    (config) => {
        console.log(config)
        return config
    } ,
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (config) => {
        console.log(config)
        return config
    } ,
    (error) => Promise.reject(error)
)
