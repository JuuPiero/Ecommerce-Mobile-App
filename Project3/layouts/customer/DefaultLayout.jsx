import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";
import { Title } from "react-native-paper";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";


export default function DefaultLayout({ children, style, refreshing, onRefresh }) {
    const navigation = useNavigation()
    const {user, token} = useContext(AuthContext)


    if(!token) {
        navigation.navigate('Login')
    }

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