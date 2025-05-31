import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DefaultLayout from '../../layouts/customer/DefaultLayout';
import {products} from '../../utils/data'
import OrderItem from '../../components/customer/OrderItem';
import Loading from '../../components/Loading';
const styles = StyleSheet.create({
    orderContainer: {
        justifyContent: 'space-evenly', 
        padding: 10, 
        backgroundColor: 'white', 
        marginBottom: 10, 
        borderRadius: 10
    },
    pending: {
        backgroundColor: '#fff4da',
        color: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10        
    }
})


export default function OrderDetail({order}) {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(true);
    const [orderItems, setOrderItems] = useState([])
    
    const onRefresh = async () => {
        // 
        setOrderItems(products.map(product => {
            return {product,
                product_name: product.name,
                product_price: product.price,
                quantity: 2
            }
        }))

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
            <Title style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 25,
                    marginVertical: 20
            }}>Order Detail</Title>
          
            <View style={styles.orderContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{ 
                        fontWeight: 'bold',
                        fontSize: 20,
                        borderRadius: 15
                    }}>Order ID: #01232</Text>
                    <Text style={styles.pending}>Pending</Text>
                </View>
                <Text>Order at 6:35PM</Text>
                <View>
                    {/* foreach */}
                    <OrderItem  orderItem={orderItems[0]}/>
                    <OrderItem  orderItem={orderItems[2]}/>
                    <OrderItem  orderItem={orderItems[1]}/>
                    <OrderItem  orderItem={orderItems[3]}/>
                </View>
            </View>
            {/* {
                order.status == 'Pending' ? <Button mode='contained' style={{backgroundColor: 'red'} }>Cancelled</Button>
                : null
            } */}
            <Button mode='contained' style={{backgroundColor: 'red'} }>Cancelled</Button>
        </DefaultLayout>
    )
}

