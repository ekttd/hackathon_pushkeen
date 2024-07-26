// axiosInstance.js
import axios from 'axios';

// Создаем экземпляр Axios с настройками
const instance = axios.create({
    baseURL: 'http://localhost:5000', // Адрес вашего бэкэнда
    withCredentials: true  // Обеспечивает передачу cookies
});

export default instance;
