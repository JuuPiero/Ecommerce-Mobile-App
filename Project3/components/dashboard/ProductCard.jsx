import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';


function ProductCard(product) {
    return (
        <View style={styles.productCard}>
            <Image
                style={styles.cardImage}
                source={{uri: 'https://www.shipbob.com/au/wp-content/uploads/sites/33/2022/07/PRODUCT-RANGE.jpg'}}
                resizeMode={'contain'} // cover or contain its upto you view look
            />
            <View>
                <Text style={{ fontWeight: 'bold' }}>Test sản phẩm</Text>
                <Text>188$ * 10 in stocks</Text>
            </View>
            <Button onPress={() => { alert('edit') }}>Edit</Button>
        </View>
    )
}
const styles = StyleSheet.create({
    productCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 15,
    },
    cardImage: {
        width: 50,
        height: 50,
        objectFit: 'contain'
    }

})
export default ProductCard;