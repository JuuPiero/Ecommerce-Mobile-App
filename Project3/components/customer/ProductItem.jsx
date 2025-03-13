import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

export default function ProductItem() {
    return (
        <View onTouchStart={e => {
            Alert.alert("Go to product detail")
        }} style={styles.productItem}>
             <Image
                style={styles.productImage}
                source={{uri: 'https://bizweb.dktcdn.net/100/446/400/products/laptop-dell-latitude-7420-1-gia-loc.jpg?v=1686626945173'}}
                resizeMode={'cover'} // cover or contain its upto you view look
            />
            <Text style={styles.productName}>Name</Text>
            <Text style={styles.productPrice}>120 VNĐ</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    productItem: {
        width: '42%',
        display: 'flex'
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 15
    },
    productPrice: {
        fontWeight: 700,
        fontSize: 28
    },
    productName: {
        fontSize: 20
    }

})