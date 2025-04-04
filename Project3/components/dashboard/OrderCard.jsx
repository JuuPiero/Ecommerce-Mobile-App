import React from 'react';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function OrderCard({order}) {
    const navigation = useNavigation()
    
    return (
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, backgroundColor: 'white', marginBottom: 10, borderRadius: 15}}>
            <View>
                <Text style={{ 
                    fontWeight: 'bold',
                    fontSize: 20
                }}>{order.status}</Text>
                <Text>Amount: {order.total_amount}</Text>
            </View>
            <Button onPress={() => {  

            }}>Detail</Button>
        </View>
    )
}

export default OrderCard;