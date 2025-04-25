import { Alert, Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import DefaultLayout from "../../layouts/customer/DefaultLayout";
import { useState } from "react";
import {Button, TextInput, Title } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import CartManager from "../../utils/CartManager";
import { Picker } from "@react-native-picker/picker";
import ReviewItem from "../../components/customer/ReviewItem";
const { width } = Dimensions.get('window');
const data = [
    { id: '1', image: 'https://woodentwist.com/cdn/shop/products/91pjix_sL5L._SL1500.jpg' },
    { id: '2', image: 'https://woodenbazar.com/cdn/shop/files/new-handicrafts-wooden-hand-carved-royal-look-chair-518.webp?v=1729347126' },
    { id: '3',image: 'https://woodentwist.com/cdn/shop/products/91pjix_sL5L._SL1500.jpg' },
]


export default function ProductDetail() {
    const route = useRoute()
    const {id, product} = route.params

    const [quanity, setQuantity] = useState(1)


    const addToCart = async () => {
        try {
            await CartManager.add(product, quanity)
            Alert.alert("Add item to cart successfully")
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <DefaultLayout>
            <View style={{
                // marginVertical: 30,
                paddingVertical: 15,
                backgroundColor: '#ccc'
            }}>
                <FlatList
                    data={product.images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => ( // Thêm destructuring { item }
                        <ImageBackground 
                            source={{ uri: item.name }} 
                            style={styles.card}
                        />
                    )}/>
            </View>
            <View style={{
                flexDirection: 'column',
                gap: 15
            }}>
                <Text style={{
                    fontWeight: '500',
                    fontSize: 30,
                    marginTop: 15
                }}>Tên sản phẩm</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    gap: 10
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 26,
                        maxWidth: '45%'
                    }}>{product.price}đ</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10
                    }}>
                        <Button onPress={e => {
                            setQuantity(prev => {
                                return ( prev - 1) < 1 ? 1 :  (prev - 1)
                            })
                        }} mode="outlined">-</Button>
                        <Text style={{
                            fontSize: 20
                        }}>{quanity}</Text>
                        <Button style={{

                        }} onPress={e => {
                            setQuantity(prev => prev + 1)
                        }} mode="outlined">+</Button>
                    </View>
                </View>
                <Button style={{
                    paddingVertical: 5,
                }} mode="contained" onPress={addToCart} >Add To Cart</Button>      
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                }}>Description</Text>

                <Text>{product.description}</Text>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                }}>Thông số</Text>

                {
                    product.attributes.map(attr =>  <Text key={attr.name}><Text style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                    }}>{attr.name}</Text>: {attr.value}</Text>)
                }

            {/* <View stickyHeaderIndices={[0]}></View> */}
            </View>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginVertical: 15
            }}>Đánh giá</Text>
            <View style={{
                gap: 10,
                marginVertical: 10
            }}>
                <ScrollView style={{
                    maxHeight: 300,
                    overflow: 'scroll',
                    gap: 20
                }}>
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                </ScrollView>
                
                
                <View style={{
                    marginTop: 30,
                    gap: 10
                }}>
                    <View style={{
                            borderWidth: 1,
                           
                        }}>
                        <Picker onValueChange={rate => {
                        }} placeholder="Trạng thái">
                            <Picker.Item label="Rate" value="1" />
                            <Picker.Item label="🌟" value="1" />
                            <Picker.Item label="🌟🌟" value="2"/>
                            <Picker.Item label="🌟🌟🌟" value="3" />
                            <Picker.Item label="🌟🌟🌟🌟" value="4" />
                            <Picker.Item label="🌟🌟🌟🌟🌟" value="5" />
                        </Picker>
                    </View>
                    <TextInput
                        style={{
                            minHeight: 100
                        }}
                        // onChangeText={text => {
                        //     setFormData({...formData, description: text})
                        // }}
                        placeholder="Địa chỉ"
                        multiline={true} 
                        numberOfLines={100} 
                        mode="outlined"/>
                    <Button mode="contained">Submit</Button>
                </View>
            </View>
            
        </DefaultLayout>
    )
}
const styles = StyleSheet.create({
    card: {
        width: width * 0.8,
        height: 250,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden'
    },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    
})