import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";
import { Title } from "react-native-paper";


export default function DefaultLayout({ children, style, refreshing, onRefresh }) {

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