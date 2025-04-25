import { useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { imageUrl, reloadPage } from "../../utils/utils";
import CartManager from "../../utils/CartManager";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    cartItemContainer: {

        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    productPrice: {
        fontSize: 15,
        color: '#ccc',
        maxWidth: 110
    },


})


export default function CartItem({cartIem}) {
    const navigation = useNavigation()
    const [quantity, setQuantity] = useState(cartIem.quantity)
    
    const removeItem = async () => {
        const cart = await CartManager.get()
        const index = cart.indexOf(cartIem);
        cart.splice(index, 1);
        await CartManager.save(cart)
        reloadPage(navigation)
        // const currentRoute = navigation.getState().routes[navigation.getState().index];
        // navigation.replace(currentRoute.name, currentRoute.params);
    }


    return (
        <Pressable style={styles.cartItemContainer}>
            <Image style={{
                width: 70,
                height: 70,
                borderRadius: 10
            }} source={{uri: imageUrl(cartIem.product.images[0].name)}}
            resizeMode={'cover'}  />
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={styles.productName}>{cartIem.product.name}</Text>
                    <Text 
                    onPress={removeItem}
                    style={{
                        width: 24,
                        height: 24,
                        textAlign: 'center',
                        position: 'absolute',
                        right: 0,
                        top: -10,
                    }}>x</Text>
                </View>
                <View style={{ 
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: 15
                }}>
                    <Text style={styles.productPrice}>{cartIem.product.price}đ</Text>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 10
                    }}>
                        <Button title="-" onPress={e => {
                            setQuantity(prev => {
                                const quanity = prev === 1 ? 1 : (prev - 1)
                                cartIem.quantity = quanity
                                return quanity
                            })
                        }} />
                        <Text>{quantity}</Text>
                        <Button title="+" onPress={e => {
                            setQuantity(prev => {
                                cartIem.quantity = (prev + 1)
                                return cartIem.quantity
                            })
                        }}/>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

