import React from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    orderContainer: {
        justifyContent: 'space-evenly', 
        padding: 10, 
        backgroundColor: 'white', 
        marginBottom: 10, 
        borderRadius: 15,
        minHeight: 100
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
    cancel: {
        backgroundColor: '#fff4da',
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10        
    }
})

function OrderCard({order}) {
    const navigation = useNavigation()
    
    return (
        <Pressable onPress={() => {
            navigation.navigate('OrderDetail', {order})
        }} style={styles.orderContainer}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{ 
                    fontWeight: 'bold',
                    fontSize: 20,
                    borderRadius: 15
                }}>Order ID: #01232</Text>
                <Text style={styles.pending}>{order?.status ?? 'Cancelled'}</Text>
            </View>
            <Text>Order at 6:35PM</Text>
        </Pressable>
    )
}

export default OrderCard;