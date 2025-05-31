import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";
import { Title } from "react-native-paper";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";


export default function DefaultLayout({ children, style, refreshing, onRefresh }) {
    const navigation = useNavigation()
    const {token} = useContext(AuthContext)

    useEffect(() => {
        if (!token) {
            navigation.replace('Login');
        }
    }, [token]);  // Khi token thay đổi thì mới navigate

    return (
        <ScrollView style={[{
            backgroundColor: '#fff'
        }, style]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <SafeAreaView style={{
                margin: 15,
                marginTop: 30,

            }}>
                {children}
            </SafeAreaView>
        </ScrollView>
       
    )
}