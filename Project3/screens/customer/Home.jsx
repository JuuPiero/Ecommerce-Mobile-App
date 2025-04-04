import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import ProductItem from "../../components/customer/ProductItem";
import DefaultLayout from "../../layouts/customer/DefaultLayout";
import CategoryItem from "../../components/customer/CategoryItem";
import CategorySlider from "../../components/customer/CategorySlider";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";


export default function Home() {
    const navigation = useNavigation();
    
    // useEffect(() => {
    //     AsyncStorage.setItem("test", JSON.stringify([
    //         1, 2, 3
    //     ]))

    //     const test = AsyncStorage.getItem('test')
    //     console.log(test);
        
    // }, [])

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