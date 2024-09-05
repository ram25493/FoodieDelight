import axios from 'axios';
import { notification } from 'antd';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    notification.error({
      message: 'Error',
      description: error.response ? error.response.data : 'An unknown error occurred',
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;
