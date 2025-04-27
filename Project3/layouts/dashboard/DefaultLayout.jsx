import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";
import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";



export default function DefaultLayout({ children, refreshing, onRefresh }) {
    const navigation = useNavigation()
    const {user, token} = useContext(AuthContext)
   
    useEffect(() => {
        if (!token || !user) {
            navigation.navigate('Login');
        }
    }, [token]);  // Khi token thay đổi thì mới navigate
    return (
        <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <SafeAreaView style={{
                padding: 10, 
                marginBottom: 60,
                marginTop: 25
            }}>
                <SearchHeader />
                {children}
            </SafeAreaView>
        </ScrollView>
    )
}