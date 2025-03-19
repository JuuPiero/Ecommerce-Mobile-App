import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";



export default function DefaultLayout({ children, refreshing, onRefresh }) {
   
    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <SafeAreaView style={{
                padding: 10, 
                marginBottom: 60,
                marginTop: 20
            }}>
                <SearchHeader />
                {children}
            </SafeAreaView>
        </ScrollView>
    )
}