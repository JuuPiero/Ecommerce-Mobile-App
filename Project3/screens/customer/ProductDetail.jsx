import { Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import DefaultLayout from "../../layouts/customer/DefaultLayout";
import { useState } from "react";
import {Button, Title } from "react-native-paper";
const { width } = Dimensions.get('window');
const data = [
    { id: '1', image: 'https://woodentwist.com/cdn/shop/products/91pjix_sL5L._SL1500.jpg' },
    { id: '2', image: 'https://woodenbazar.com/cdn/shop/files/new-handicrafts-wooden-hand-carved-royal-look-chair-518.webp?v=1729347126' },
    { id: '3',image: 'https://woodentwist.com/cdn/shop/products/91pjix_sL5L._SL1500.jpg' },
]


export default function ProductDetail() {
    const [quanity, setQuantity] = useState(1)

    return (
        <DefaultLayout>
            <View style={{
                // marginVertical: 30,
                paddingVertical: 15,
                backgroundColor: '#ccc'
            }}>
                <FlatList
                    data={data}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => ( // Thêm destructuring { item }
                        <ImageBackground 
                            source={{ uri: item.image }} 
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
                    fontSize: 30
                }}>Tên sản phẩm</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent:'space-between'
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 40
                    }}>$200</Text>
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
                        <Button onPress={e => {
                            setQuantity(prev => prev + 1)
                        }} mode="outlined">+</Button>
                    </View>
                </View>
                <Button style={{
                    paddingVertical: 5,
                }} mode="contained" >Add To Cart</Button>      
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    // color: 'purple'
                }}>Description</Text>

                <Text>Unreal Engine:
                    Nhận được nhiều giải thưởng công nghệ quan trọng:
                    Giải Emmy về Công nghệ & Kỹ thuật cho "Phần mềm Engine 3D trong sản xuất hoạt hình" năm 2018.
                    Giải Annie cho đóng góp kỹ thuật trong lĩnh vực hoạt hình năm 2021. 
                    EN.WIKIPEDIA.ORG
                    Nhiều trò chơi sử dụng Unreal Engine đã đạt giải thưởng lớn, như The Witcher 3: Wild Hunt và BioShock Infinite.
                </Text>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    // color: 'purple'
                }}>Thông số</Text>
                <Text><Text style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    // color: 'purple'
                }}>Color</Text>: red</Text>
                <Text><Text style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    // color: 'purple'
                }}>Color</Text>: red</Text>
                <Text><Text style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                }}>Color</Text>: red</Text>
             
            <View stickyHeaderIndices={[0]}></View>
            </View>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>Đánh giá</Text>
            <ScrollView>
            </ScrollView>
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