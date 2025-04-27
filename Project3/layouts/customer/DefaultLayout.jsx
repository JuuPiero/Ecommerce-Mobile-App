import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";
import { Title } from "react-native-paper";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";


export default function DefaultLayout({ children, style, refreshing, onRefresh }) {
    const navigation = useNavigation()
    const {user, token} = useContext(AuthContext)

    useEffect(() => {
        if (!token || !user) {
            navigation.replace('Login');
        }
    }, [token]);  // Khi token thay đổi thì mới navigate

    return (
        <ScrollView style={style} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <SafeAreaView style={{
                margin: 15,
                marginTop: 40,
            }}>
                {children}
            </SafeAreaView>
        </ScrollView>
       
    )
}