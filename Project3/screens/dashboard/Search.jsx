import { Image, Pressable, StyleSheet, Text, Touchable, View } from 'react-native'
import { Button } from 'react-native-paper';

import CartItem from '../../components/customer/CartItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CartManager from '../../utils/CartManager';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';
import ProductCard from '../../components/dashboard/ProductCard';
import CategoryCard from '../../components/dashboard/CategoryCard';
import Title from '../../components/Title';

export default function Search() {
    const route = useRoute()
    const navigation = useNavigation()
    const {keywords} = route.params
    

    const [refreshing, setRefreshing] = useState(true);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [orders, setOrders] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])

    const onSearch = async() => {
        try {
            const response = await api.get('api/v1/search?keywords=' + keywords)
            setProducts(response.data.products.data)
            setCategories(response.data.categories.data)
            setOrders(response.data.orders.data)
        } catch (error) {
            
        }
    }


    const onRefresh = async () => {
        await onSearch()
        setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [])

    if(refreshing) return <Loading />

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing} style={{
            backgroundColor: '#fff',
        }}>
            <View style={{ 
                padding: 10, 
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Text role='heading' style={{fontSize: 30}} >Keywords: </Text>
                <Text style={{fontSize: 24, color: 'red'}} >{keywords} </Text>
            </View>

            <View>
                <Text style={styles.title}>Orders</Text>
                {orders.map(order => 
                    <OrderCard status={order.status} order={order} key={order.id} />)}
            </View>

            <View>
                <Text style={styles.title}>Products</Text>
                {products.map(product => <ProductCard product={product} key={product.id} />)}
            </View>
            <View>
                <Text style={styles.title}>Categories</Text>
                {
                    categories.map(category => <CategoryCard key={category.id} category={category} />)
                }
            </View>

        </DefaultLayout>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20
    }
})