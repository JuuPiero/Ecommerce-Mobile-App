import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
export const API_URL = "https://stork-growing-sheep.ngrok-free.app"

const api = axios.create({
    baseURL: API_URL, 
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use((response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Logging out...');
            await AsyncStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);


export default api