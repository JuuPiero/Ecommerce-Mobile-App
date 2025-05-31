import { Image, Pressable, StyleSheet, Text, Touchable, View } from 'react-native'
import { Button, Title } from 'react-native-paper';
import DefaultLayout from '../../layouts/customer/DefaultLayout';
import CartItem from '../../components/customer/CartItem';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CartManager from '../../utils/CartManager';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHeader from '../../components/dashboard/SearchHeader';
import {products as data} from '../../utils/data'
import ProductItem from '../../components/customer/ProductItem';

export default function Search() {
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(true);
   
    const [products, setProducts] = useState([])

    const onRefresh = async () => {
        setProducts(data)
        setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [])


    if(refreshing) return <Loading />

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing} style={{
            // backgroundColor: '#eee',
        }}>
            <SearchHeader />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: 10
            }}>
                {
                    products.map(product => <ProductItem key={product.id} product={product} />)
                }
            </View>
        </DefaultLayout>
    )
}
