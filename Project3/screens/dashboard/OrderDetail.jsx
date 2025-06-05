import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, Title } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';
import OrderItem from '../../components/customer/OrderItem';
import Loading from '../../components/Loading';
import { Picker } from '@react-native-picker/picker';
import api from '../../api/api';
import { formatMoneyVN } from '../../utils/utils';
const styles = StyleSheet.create({
    orderContainer: {
        justifyContent: 'space-evenly', 
        padding: 10, 
        backgroundColor: 'white', 
        marginBottom: 10, 
        borderRadius: 10
    },
    statusBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginVertical: 4
    },
    pending: {
        backgroundColor: '#fff4da',
        color: 'orange',
    },
    processing: {
        backgroundColor: '#d0e7ff',
        color: '#007bff',

    },
    shipped: {
        backgroundColor: '#d9f6ff',
        color: '#17a2b8',

    },
    completed: {
        backgroundColor: '#d6f5d6',
        color: 'green',

    },
    cancelled: {
        backgroundColor: '#ffe0e0',
        color: 'red',
    },

})

const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return [styles.statusBox, styles.pending];
      case 'processing':
        return [styles.statusBox, styles.processing];
      case 'shipped':
        return [styles.statusBox, styles.shipped];
      case 'completed':
        return [styles.statusBox, styles.completed];
      case 'cancelled':
        return [styles.statusBox, styles.cancelled];
      default:
        return [styles.statusBox];
    }
}

export default function OrderDetail() {
    const route = useRoute()
    const {status} = route.params   
    
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(true);
    const [order, setOrder] = useState(route.params.order)
    const [invoice, setInvoice] = useState(null)
    const loadOrder = async () => {
        try {
            const response = await api.get("api/v1/order/detail/" + order.id)
            setOrder(response.data.order)
            setInvoice(response.data.invoice_link)
            
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const onRefresh = async () => {
        await loadOrder()
        setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [])

    const onSaveOrder = async() => {
     
        try {
            setRefreshing(true)
            const response = await api.post('api/v1/order/update/' + order.id, order)
            setRefreshing(false)
            Alert.alert(response.data.message)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    
   if(refreshing || !status || !order) return <Loading />

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing} style={{
            backgroundColor: '#eee',
        }}>
            <Button onPress={ ()=>{ Linking.openURL(invoice)}} 
            style={{
                marginVertical: 15, 
                width: '50%'}} mode='contained'>Print invoice</Button>
          
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
                    <Text style={getStatusStyle(order?.status)}>{order?.status}</Text>
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
                        order.order_items?.map(item => <OrderItem key={item.id} orderItem={item}/>)
                    }
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Text style={{fontSize: 18}}>Amount:</Text>
                    <TextInput style={{ fontWeight: 'bold', fontSize: 24, maxWidth: 200}} keyboardType='numeric' onChangeText={text => {
                        setOrder(prev => {
                            return {...prev, total_amount: text}
                        })
                    }} mode='outlined' value={formatMoneyVN(order.total_amount)}/>
                    <Text style={{ fontWeight: 'bold', fontSize: 24}}>đ</Text>
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
            <Button mode='contained' onPress={onSaveOrder} >Save</Button>
        </DefaultLayout>
    )
}

