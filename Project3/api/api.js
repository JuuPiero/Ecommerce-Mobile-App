import axios from "axios"

export const API_URL = "http://192.168.1.6:8000"


const api = axios.create({
    baseURL: API_URL, 
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
})

// Interceptor xử lý request (thêm token nếu cần)
api.interceptors.request.use(config => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // config.headers["Content-Type"] = 'multipart/form-data'
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

// Interceptor xử lý response (xử lý lỗi chung)
api.interceptors.response.use((response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Ví dụ: Logout nếu token hết hạn
            console.error('Unauthorized! Logging out...');
            localStorage.removeItem('token');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


// async function signup({ username, password, email, bloodType }) {
//     try {
        

//     } catch (error) {
//         alert(error.message)
//     }
// }




export default api