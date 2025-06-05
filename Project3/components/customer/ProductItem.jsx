import { useNavigation } from "@react-navigation/native";
import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { API_URL } from "../../api/api";
import { formatMoneyVN, imageUrl } from "../../utils/utils";

export default function ProductItem({product}) {
    const navigation = useNavigation()
    
    
    return (
        <Pressable onPress={() => {
            navigation.navigate('Home', {
                screen: 'ProductDetail',
                params: {
                    product,
                    id: product.id
                }
            })
        }} style={styles.productItem}>
            <Image
                style={styles.productImage}
                source={{uri: imageUrl(product.images[0].name) }}
                resizeMode={'cover'} 
            />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{formatMoneyVN(product.price)}đ</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    productItem: {
        width: '48%',
        gap: 8,
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        padding: 15,
        borderRadius: 15,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: 16,
        // textShadowColor: 'rgba(0, 0, 0, 1)',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 10
    },
    productName: {
        fontSize: 14,
    }

})