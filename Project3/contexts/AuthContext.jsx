import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { Text } from "react-native-paper";
import api, { API_URL } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    // const navigation = useNavigation()
    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);


    const login = async (email, password) => {
        try {
            const response = await axios.post(API_URL + '/api/v1/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { token, user } = response.data;
            setToken(response.data.token);
            setUser(response.data.user);
            setRole(response.data.user.role); 
            
            await AsyncStorage.setItem("token", token);
            if(!token && !user) {
                Alert.alert("back to login")
                // navigation.navigate('Login')
            }
            return user
        } catch (error) {
            console.log(error);
            Alert.alert('Login failed');
            // navigation.navigate('Login')
        }
    }

    const logout = async () => {
        try {
            const response = await api.post('/api/logout'); // nếu cần gọi
        } catch (err) {
            console.log("Logout error", err);
        }
        setToken(null);
        setRole(null);
        setUser(null);
        await AsyncStorage.removeItem('token');
    };

    // Kiểm tra token khi load lại trang
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                    const response = await axios.get(API_URL + '/api/me', {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    });
                    setUser(response.data);
                    setRole(response.data.role);
                }
                else {
                    setToken(null);
                }
            } catch (error) {
                console.log("Auth check failed", error);
                await AsyncStorage.removeItem('token');
                setToken(null);
                setUser(null);
                setRole(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const hasRole = (requiredRole) => role === requiredRole;

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            role, 
            login, 
            logout, hasRole, 
            loading 
        }}>
            {loading ? ( <Text>Loading</Text>) : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;