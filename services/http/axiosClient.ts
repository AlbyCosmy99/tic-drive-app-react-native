import axios from 'axios';

const PROD_BACKEND_URL = 'https://ticdrive20241221234140.azurewebsites.net'
const DEV_BACKEND_URL = 'https://9d95-95-235-179-147.ngrok-free.app'

const backendUrl = __DEV__
  ? DEV_BACKEND_URL
  : PROD_BACKEND_URL

const axiosClient = axios.create({
    baseURL: backendUrl + '/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;
