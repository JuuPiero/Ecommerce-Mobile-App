import { Image, Pressable, StyleSheet, Text, Touchable, View } from 'react-native'
import { Button, Title } from 'react-native-paper';
import DefaultLayout from '../../layouts/customer/DefaultLayout';
import CartItem from '../../components/customer/CartItem';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CartManager from '../../utils/CartManager';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    cartButton: {
        borderRadius: 15,
        paddingVertical: 10,
        marginVertical: 10,
    }
})
export default function Cart() {
    const navigation = useNavigation()
    const [cart, setCart] = useState(null)
    const [refreshing, setRefreshing] = useState(true);

    const loadCart = async () => {
        const cart = await CartManager.get()
        setCart(cart)
    }

    const onRefresh = async () => {
        await loadCart()
        setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [])

   

    async function goToCheckout() {
        console.log(cart);
        await CartManager.save(cart)
        navigation.navigate("Checkout");
    }

    if(refreshing) return <Loading />

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing} style={{
            backgroundColor: '#eee',
        }}>
            <Title style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 25,
                    marginVertical: 20
            }}>My cart</Title>
            <View style={{
                flexDirection: 'column',
                gap: 10,
            }}>

            {cart.map(item => <CartItem key={item.id} cartIem={item} />)}
             
            </View>
            
            <Button style={styles.cartButton} mode="contained" onPress={goToCheckout}>Go to Checkout</Button>

            <Button style={styles.cartButton} mode="outlined" onPress={() => {
                navigation.navigate("Home");
            }}>Continue Shopping</Button>
        </DefaultLayout>
    )
}
