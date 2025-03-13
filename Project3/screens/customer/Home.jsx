import { useNavigation } from "@react-navigation/native";
import { Image, View } from "react-native"
import { Button, Text } from "react-native-paper"
import ProductItem from "../../components/customer/ProductItem";
import DefaultLayout from "../../layouts/customer/DefaultLayout";

export default function Home() {
    const navigation = useNavigation();
    return (
        <DefaultLayout>
            <Text>Home</Text>
          
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: 10
            }}>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </View>
          
            <Button mode="contained" onPress={() => {
                navigation.replace("Admin");
            }}>Test chuyển sang admin</Button>
        </DefaultLayout>
    )
}