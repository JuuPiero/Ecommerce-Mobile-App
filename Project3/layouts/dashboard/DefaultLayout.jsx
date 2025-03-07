import { SafeAreaView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";


const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        left: -100
    }
})

export default function DefaultLayout({ children }) {

    return (
        <SafeAreaView style={{padding: 10, marginBottom: 60}}>
            <SearchHeader />
            {/* <View style={styles.sidebar}>
                SIDEBAR
            </View> */}
            {children}
        </SafeAreaView>
    )
}