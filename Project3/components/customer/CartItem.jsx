import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    cartItemContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})


export default function CartItem() {
    return (
        <Pressable style={styles.cartItemContainer}>
            <Image style={{
                width: 70,
                height: 70,
                borderRadius: 10
            }} source={{uri: 'https://bizweb.dktcdn.net/100/446/400/products/laptop-dell-latitude-7420-1-gia-loc.jpg?v=1686626945173'}}
            resizeMode={'cover'}  />
            <View style={{
                flex: 1
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>Tên sản phẩm</Text>
                <View style={{ 
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // gap: 10
                }}>
                    <Text style={{ width: '30%' }}>x2</Text>
                    <Text style={{
                        fontSize: 20,
                        color: '#ccc'
                    }}>$210</Text>
                    <Text style={{
                        fontSize: 30
                    }}>$420</Text>
                </View>
            </View>
        </Pressable>
    )
}
