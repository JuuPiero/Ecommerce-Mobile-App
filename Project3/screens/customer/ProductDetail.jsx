import { Alert, Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import DefaultLayout from "../../layouts/customer/DefaultLayout";
import { useEffect, useState } from "react";
import {Button, TextInput} from "react-native-paper";
import CartManager from "../../utils/CartManager";
import ReviewItem from "../../components/customer/ReviewItem";
import { Picker } from "@react-native-picker/picker"
import { useRoute } from "@react-navigation/native";
import api, { API_URL } from "../../api/api";
import { formatMoneyVN, imageUrl } from "../../utils/utils";
const { width } = Dimensions.get('window');

export default function ProductDetail() {
    const route = useRoute()
    const [product, setProduct] = useState(route.params.product)
    const [refreshing, setRefreshing] = useState(false);
    const [quanity, setQuantity] = useState(1)

    const getProduct = async () => {
        try {
            setRefreshing(true)
            const response = await api.get('/api/v1/product/get/' + product.id)
            setProduct(response.data.product)
            setRefreshing(false)

        } catch (error) {
            Alert.alert(error.message)
          
        }
    }


   
    const onRefresh = async () => {
        await getProduct()
    }
    useEffect(() => {
        onRefresh()
    }, [])

    if (!product) {
        return <Text>Sản phẩm không tồn tại</Text>;
    }


    const addToCart = async () => {
        try {
            await CartManager.add(product, quanity)
            Alert.alert("Add item to cart successfully")
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing}>

            <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                    {Array.isArray(product?.images) &&
                        product.images.map((item, index) => (
                        item?.name ? (
                            <Image
                            key={item?.id ?? index}
                            style={styles.image}
                            source={{ uri: imageUrl(item.name) }}
                            resizeMode="cover"
                            />
                        ) : null
                        ))}
                </ScrollView>
            </View>
            <View style={{
                flexDirection: 'column',
                gap: 15,
                marginVertical: 15
            }}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    gap: 10
                }}>
                    <Text style={styles.productPrice}>{formatMoneyVN(product.price)}đ</Text>
                    <View style={styles.actionContainer}>
                        <Text style={styles.action} onPress={() => {
                            setQuantity(prev => {
                                return ( prev - 1) < 1 ? 1 :  (prev - 1)
                            })
                        }}>-</Text>
                        <Text style={{ fontSize: 20}}>{quanity}</Text>
                        <Text style={styles.action} onPress={() => {
                            setQuantity(prev => prev + 1)
                        }} >+</Text>
                    </View>
                </View>
                <Button style={{
                    paddingVertical: 5,
                }} mode="contained" onPress={addToCart} >Add To Cart</Button>      
                <View style={{
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    padding: 8,
                    borderRadius: 8,
                    gap: 10
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>Description</Text>

                    <Text>{product.description}</Text>
                </View>
                
                <View style={{
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    padding: 8,
                    borderRadius: 8,
                    gap: 10
                }}>
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
                </View>
            </View>

            <View style={{
                marginVertical: 20,
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                }}>Đánh giá</Text>

                <Pressable  style={styles.ratingsContainer}>
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                </Pressable>
                
                <View style={styles.ratingForm}>
                    <View style={{
                        borderWidth: 1,
                        borderRadius: 5
                    }}>
                        <Picker onValueChange={rate => {

                        }} placeholder="Rate">
                            <Picker.Item label="Rate"/>
                            <Picker.Item label="🌟" value="1" />
                            <Picker.Item label="🌟🌟" value="2"/>
                            <Picker.Item label="🌟🌟🌟" value="3" />
                            <Picker.Item label="🌟🌟🌟🌟" value="4" />
                            <Picker.Item label="🌟🌟🌟🌟🌟" value="5" />
                        </Picker>
                    </View>
                    <TextInput
                        style={{
                            minHeight: 100,
                        }}
                        placeholder="Nội dung"
                        multiline={true} 
                        numberOfLines={100} 
                        mode="outlined"/>
                    <Button mode="contained">Submit</Button>
                </View>

                <View style={{
                    marginVertical: 20,
                    gap: 20,
                }}>
                    <Text style={styles.label}>Suggest</Text>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: 10
                    }}>
                        {/* {
                            products.map(product => <ProductItem key={product.id} product={product} />)
                        } */}
                    </View>
                </View>
            </View>
        </DefaultLayout>
    )
}
const styles = StyleSheet.create({
    imagesContainer: {
        paddingVertical: 15,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        borderRadius: 8
    },
    image: {
        width: width * 0.8,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden',
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: 22,
        maxWidth: '45%'
    },
    quanity: {
        fontWeight: 'bold'
    },
    label: { fontSize: 22, fontWeight: 'bold' },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    action: {
        width: 40,
        height: 40,
        backgroundColor: '#0865fe',
        fontSize: 20,
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'white',
        borderRadius: 8        
    },
    ratingsContainer: {
        overflow: 'scroll',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        maxHeight: 300
    },
    ratingForm: {
        marginTop: 30,
        gap: 10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        padding: 8,
        borderRadius: 8
    }
    
})