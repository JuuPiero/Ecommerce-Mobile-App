import { useNavigation } from "@react-navigation/native";
import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProductItem({product}) {
    const navigation = useNavigation()

    return (
        <Pressable onPress={e => {
            navigation.navigate('ProductDetail', {id: 1})
        }} style={styles.productItem}>

            <Image
                style={styles.productImage}
                source={{uri: 'https://bizweb.dktcdn.net/100/446/400/products/laptop-dell-latitude-7420-1-gia-loc.jpg?v=1686626945173'}}
                resizeMode={'cover'} 
            />
            <Text style={styles.productName}>Name</Text>
            <Text style={styles.productPrice}>120 VNĐ</Text>
        </Pressable>
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
        borderRadius: 8
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: 28
    },
    productName: {
        fontSize: 20
    }

})