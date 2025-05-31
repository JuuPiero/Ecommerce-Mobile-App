import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native"
import ProductItem from "../../components/customer/ProductItem";
import DefaultLayout from "../../layouts/customer/DefaultLayout";
import CategorySlider from "../../components/customer/CategorySlider";

import { useEffect, useState } from "react";
import { products } from "../../utils/data";


export default function Home() {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = async () => {
        // setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [])


    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing}>
            <CategorySlider />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: 10,
            }}>
                {
                products.map(product => <ProductItem key={product.id} product={product} />)
                }
            </View>
        </DefaultLayout>
    )
}