import { SafeAreaView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";


const styles = StyleSheet.create({

})

export default function DefaultLayout({ children }) {

    return (
        <SafeAreaView style={{padding: 10}}>
            <SearchHeader />
            {children}
        </SafeAreaView>
    )
}