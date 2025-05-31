import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";
import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";


export default function DefaultLayout({ children, refreshing, onRefresh, style }) {
    const navigation = useNavigation()
    const {token} = useContext(AuthContext)
   
    useEffect(() => {
        if (!token) {
            navigation.replace('Login');
        }
        // if(onRefresh) {
        //     onRefresh()
        // }
    }, [token]);  
    return (
        <ScrollView style={[{
            backgroundColor: '#fff'
        }, style]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <SafeAreaView style={{
                padding: 10, 
                marginBottom: 60,
                marginTop: 30,
            }}>
                <SearchHeader />
                {children}
            </SafeAreaView>
        </ScrollView>
    )
}