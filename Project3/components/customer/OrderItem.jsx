import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { API_URL } from '../../api/api';
import { imageUrl } from '../../utils/utils';

import { useNavigation } from '@react-navigation/native';


function OrderItem({orderItem}) {
    const navigation = useNavigation()
    // const editProduct = () => {
    //     navigation.navigate("EditProduct", {id: orderItem.id, orderItem})
    // } 
    return (
        <View style={styles.productCard}>
            <Image
                style={styles.cardImage}
                source={{uri: imageUrl( orderItem.product?.images[0].name)}}
                resizeMode={'contain'} // cover or contain its upto you view look
            />
            <View>
                <Text style={{ fontWeight: 'bold' }}>{orderItem.product.name ?? orderItem.product_name}</Text>
                <Text>{orderItem.product.price ?? orderItem.product_price}đ</Text>
                <Text style={{marginTop: 10}}>Quantity: x{orderItem.quantity}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    productCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 15,
        gap: 20,
    },
    cardImage: {
        width: 80,
        height: 80,
        objectFit: 'contain',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5
    }

})
export default OrderItem;