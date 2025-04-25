import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import DefaultLayout from '../../layouts/customer/DefaultLayout';
import { Button, Title } from 'react-native-paper';
import OrderCard from '../../components/customer/OrderCard';

export default function Purchase() {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(true);
        
    const onRefresh = async () => {
        // 

        setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [])
    

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing} style={{
            backgroundColor: '#eee',
        }}>
            <Title style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 25,
                    marginVertical: 20
            }}>My orders</Title>
            <View style={{
                flexDirection: 'column',
            }}>

            {/* {cart.map(item => <CartItem key={item.id} cartIem={item} />)} */}
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />


            </View>
            
            {/* <Title style={{
                        textAlign: 'center',
                    fontSize: 25,
                    marginVertical: 20
            }}>You have no orders</Title> */}
        </DefaultLayout>
    )
}

