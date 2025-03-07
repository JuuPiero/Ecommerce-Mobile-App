import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { Text } from "react-native-paper";
import api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const API_URL = 'http://127.0.0.1:8082';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        try {
            const response = await axios.post(API_URL + '/api/login', { email, password });
            const { token, user } = response.data;
            setToken(token);
            setUser(user);
            setRole(user.role); 
            await AsyncStorage.setItem("token", token);
            if(!token && !user) {
                alert("back to login")
                // return <Navigate to="/login" />

            }
            
        } catch (error) {
            // console.error('Login failed:', error.response.data.message);
            alert('Login failed', error);
            // return <Navigate to="/login" />
        }
    }

    const logout = async () => {
        // const response = await axios.post(API_URL + '/api/login', { email, password });
        api.post('/api/logout').then(response => {
            console.log(response.data)
        })
        setToken(null);
        setUser(null);
        setRole(null);
        await AsyncStorage.removeItem('token');
        navigate('/login');
        // return <Navigate to="/login" />
    };

    // Kiểm tra token khi load lại trang
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const response = await axios.get( API_URL + '/api/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(response.data);
                    setRole(response.data.role);
                } catch (error) {
                    console.error('Token invalid or expired');
                    logout();
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, [token]);

    const hasRole = (requiredRole) => role === requiredRole;

    return (
        <AuthContext.Provider value={{ 
        user, 
        token, 
        role, 
        login, 
        logout, hasRole, 
        loading }}>
            {loading ? ( <Text>Loading</Text>) : children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;