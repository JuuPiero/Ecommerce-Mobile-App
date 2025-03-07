import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';


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
        // borderRadius: 25,
        objectFit: 'contain'
    }


})

function ProductCard(props) {
    return (
        <View style={styles.productCard}>
            <Image
                style={styles.cardImage}
                source={{uri: 'https://www.shipbob.com/au/wp-content/uploads/sites/33/2022/07/PRODUCT-RANGE.jpg'}}
                resizeMode={'cover'} // cover or contain its upto you view look
            />
            <View>
                <Text style={{ fontWeight: 'bold' }}>TEst sản phẩm</Text>
                <Text style={{ }}>188$ * 10 in stocks</Text>
            </View>
            <Button onPress={() => { alert('edit') }}>Edit</Button>
        </View>
    )
}

export default ProductCard;