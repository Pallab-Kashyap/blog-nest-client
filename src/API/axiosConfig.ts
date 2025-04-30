import axios from 'axios'
import { BASE_URL } from './apiConfig';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true
  })
  
  axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        if(err.response.status === 401){
            window.location.href = '/login';
        }
  
        return Promise.reject(err)
    }
  )
  
  export {axiosInstance}