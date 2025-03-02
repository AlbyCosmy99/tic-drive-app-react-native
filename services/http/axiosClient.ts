import axios from 'axios';

const PROD_BACKEND_URL = 'https://ticdrive.azurewebsites.net';
const DEV_BACKEND_URL = 'https://ticdrive.azurewebsites.net'; //local

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
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Errore generico';
    console.error('Backend error:', errorMessage);
    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
    });
  },
);

export default axiosClient;
