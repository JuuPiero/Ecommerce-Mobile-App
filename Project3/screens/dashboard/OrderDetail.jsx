import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';
import {products} from '../../utils/data'
import OrderItem from '../../components/customer/OrderItem';
import Loading from '../../components/Loading';
import { Picker } from '@react-native-picker/picker';
import api from '../../api/api';
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

export default function OrderDetail() {
    const route = useRoute()
    const {status} = route.params   
    
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(true);
    const [orderItems, setOrderItems] = useState([])
    const [order, setOrder] = useState(route.params.order)
    const [invoice, setInvoice] = useState(null)
    const loadOrder = async () => {
        try {
            const response = await api.get("api/v1/order/detail/" + order.id)
            console.log(response.data.invoice_link);
            setOrder(response.data.order)
            setInvoice(response.data.invoice_link)
            
        } catch (error) {
            
        }
    }

    const onRefresh = async () => {
        await loadOrder()
        setOrderItems(products)
        setRefreshing(false)
        
    };
    useEffect(() => {
        onRefresh()
    }, [])
    
   if(refreshing || !status || !order) return <Loading />

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing} style={{
            backgroundColor: '#eee',
        }}>
            <Button onPress={ ()=>{ Linking.openURL(invoice)}} style={{marginBottom: 15, width: '50%'}} mode='contained'>Print invoice</Button>
          
            <View style={{
                flexDirection: 'column',
                gap: 10,
            }}>
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
                        <Text style={styles.pending}>{order?.status}</Text>
                    </View>
                    <Text>Order at 6:35PM</Text>
                    <View style={{marginVertical: 15, gap: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>Customer: </Text>
                            <Text>{order.name}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>Phone Number: </Text>
                            <Text>{order.phone_number}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>Address: </Text>
                            <Text>{order.address}</Text>
                        </View>
                    </View>
                    <View>
                        {
                            order.order_items.map(item => <OrderItem orderItem={item}/>)
                        }
                    </View>
                    <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 18}}>Total Amount: </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 24}}>{order.total_amount}đ</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{borderWidth: 1, borderRadius: 10, marginVertical: 15}}>
                <Picker selectedValue={order.status}  onValueChange={status => {
                    setOrder(prev => {
                        return {...prev, status}
                    })
                }} placeholder="Trạng thái" style={styles.dropdown}>
                    {
                        status.map((status, index) => <Picker.Item key={index} label={status} value={status} />)
                    }
                </Picker>
            </View>
            <Button mode='contained' >Update</Button>
        </DefaultLayout>
    )
}

