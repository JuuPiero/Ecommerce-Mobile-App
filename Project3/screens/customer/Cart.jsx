import { Image, Pressable, StyleSheet, Text, Touchable, View } from 'react-native'
import { Button, Title } from 'react-native-paper';
import DefaultLayout from '../../layouts/customer/DefaultLayout';
import CartItem from '../../components/customer/CartItem';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    cartButton: {
        borderRadius: 15,
        paddingVertical: 10,
        marginVertical: 10,
    }
})
export default function Cart() {
    const navigation = useNavigation()
    return (
        <DefaultLayout style={{
            backgroundColor: '#eee',
        }}>
            <Title style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 25,
                    marginVertical: 20
            }}>My cart</Title>
            <View style={{
                flexDirection: 'column',
                gap: 10,
            }}>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </View>
            
            <Button style={styles.cartButton} mode="contained" onPress={() => {
                navigation.navigate("Checkout");
            }}>Go to Checkout</Button>

            <Button style={styles.cartButton} mode="outlined" onPress={() => {
                navigation.navigate("Home");
            }}>Continue Shopping</Button>
        </DefaultLayout>
    )
}
