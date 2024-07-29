// axiosInstance.js
import axios from 'axios';

// Создаем экземпляр Axios с настройками
const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true  // Передача cookies
});

export default instance;
