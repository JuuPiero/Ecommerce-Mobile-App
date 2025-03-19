import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";
import { Title } from "react-native-paper";


export default function DefaultLayout({ children }) {

    return (
        <ScrollView>
            <SafeAreaView  style={{
                margin: 15,
                marginTop: 50,
            }}>
                {children}
            </SafeAreaView>
        </ScrollView>
       
    )
}