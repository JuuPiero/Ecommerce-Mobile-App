import { SafeAreaView, StyleSheet, View } from "react-native";
import SearchHeader from "../../components/dashboard/SearchHeader";


export default function DefaultLayout({ children }) {

    return (
        <SafeAreaView style={{
            margin: 15,
            marginTop: 20
        }}>
            {/* <SearchHeader /> */}
            {/* <View style={styles.sidebar}>
                SIDEBAR
            </View> */}
            {children}
        </SafeAreaView>
    )
}