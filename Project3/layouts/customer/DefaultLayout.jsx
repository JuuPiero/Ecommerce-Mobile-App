import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";
import { Title } from "react-native-paper";


export default function DefaultLayout({ children, style }) {

    return (
        <ScrollView style={style}>
            <SafeAreaView style={{
                margin: 15,
                marginTop: 40,
            }}>
                {children}
            </SafeAreaView>
        </ScrollView>
       
    )
}