import { View } from "react-native";
import SearchHeader from "../../components/SearchHeader";


export default function DefaultLayout({ children }) {

    return (
        <View style={{ padding: 10 }}>
            <SearchHeader />
            {children}
        </View>
    )
}