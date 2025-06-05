import React from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getStatusStyle } from '../../utils/orderStatus';

const styles = StyleSheet.create({
    orderContainer: {
        justifyContent: 'space-evenly', 
        padding: 10, 
        backgroundColor: 'white', 
        marginBottom: 10, 
        borderRadius: 15,
        minHeight: 100,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    },
    pending: {
        backgroundColor: '#fff4da',
        color: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10        
    },
    completed: {
        backgroundColor: '#fff4da',
        color: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10        
    },
    cancelled: {
        backgroundColor: '#fff4da',
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10        
    }
})

function OrderCard({order, status}) {
    const navigation = useNavigation()
    
        const orderStatus = (status) => {
            switch (status) {
                case 'Pending':
                    return styles.pending
                case 'Completed':
                    return styles.completed
                default:
                    break;
            }
    
        }
    
    return (
        <Pressable onPress={() => {
            navigation.navigate('OrderDetail', {order, status})
            // Alert.alert("test")
        }} style={styles.orderContainer}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{ 
                    fontWeight: 'bold',
                    fontSize: 20,
                    borderRadius: 15
                }}>Order ID: #00{order.id}</Text>
                <Text style={getStatusStyle(order?.status)}>{order?.status}</Text>

            </View>
            <Text>Order at 6:35PM</Text>
        </Pressable>
    )
}

export default OrderCard;