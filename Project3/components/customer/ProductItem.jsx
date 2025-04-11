import { useNavigation } from "@react-navigation/native";
import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { API_URL } from "../../api/api";

export default function ProductItem({product}) {
    const navigation = useNavigation()
 
    
    return (
        <Pressable onPress={e => {
            navigation.navigate('ProductDetail', {id: product.id, product})
        }} style={styles.productItem}>
            <Image
                style={styles.productImage}
                source={{uri: product.images[0].name.includes('https') ? product.images[0].name : API_URL + '/strorage/' + product.images[0].name }}
                resizeMode={'cover'} 
            />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}đ</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    productItem: {
        width: '48%',
        gap: 8
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 8
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: 20
    },
    productName: {
        fontSize: 18
    }

})