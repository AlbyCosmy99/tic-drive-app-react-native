import axios from 'axios';

const PROD_BACKEND_URL = 'https://ticdrive.azurewebsites.net/';
const DEV_BACKEND_URL = 'https://8cf7-95-249-253-49.ngrok-free.app'; //local

const backendUrl = __DEV__ ? DEV_BACKEND_URL : PROD_BACKEND_URL;

const axiosClient = axios.create({
  baseURL: backendUrl + '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosClient;
