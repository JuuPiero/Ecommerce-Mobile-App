import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import ProductItem from "../../components/customer/ProductItem";
import DefaultLayout from "../../layouts/customer/DefaultLayout";
import CategoryItem from "../../components/customer/CategoryItem";
import CategorySlider from "../../components/customer/CategorySlider";



export default function Home() {
    const navigation = useNavigation();
    
    return (
        <DefaultLayout>
            <CategorySlider />

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