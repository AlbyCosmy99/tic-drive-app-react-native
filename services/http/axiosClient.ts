import axios from 'axios';

const PROD_BACKEND_URL = 'https://ticdrivebackend.onrender.com';
const DEV_BACKEND_URL = 'https://ticdrivebackenddevelopment.onrender.com'; //local

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
  response => response,
  error => {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : 'Errore generico';
    console.error('Backend error:', errorMessage);
    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
    });
  },
);

export default axiosClient;
