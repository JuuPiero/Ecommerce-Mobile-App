import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, Touchable, View } from 'react-native'
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
const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden'
    },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
})
export default function CategoryDetail({category}) {
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
            backgroundColor: '#eee',
        }}>
            <View style={{
                marginVertical: 30,
            }}>
                <ImageBackground 
                    source={{ uri: category?.image ? category.image : "https://www.hacom.vn/media/lib/chutchigame.jpg" }} 
                    style={[styles.card]}
                   >
                        <Text style={styles.title}>{category?.name ?? "test"}</Text>
                </ImageBackground>
            </View>
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
