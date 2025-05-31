import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, Touchable, View } from 'react-native'
import { Button, Checkbox, TextInput, Title } from 'react-native-paper';
import DefaultLayout from '../../layouts/customer/DefaultLayout';
import CartItem from '../../components/customer/CartItem';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CartManager from '../../utils/CartManager';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHeader from '../../components/dashboard/SearchHeader';
import {products as data} from '../../utils/data'
import ProductItem from '../../components/customer/ProductItem';
const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden'
    },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    filterItem: {
        flexDirection: 'row',
        gap: 10,
        alignItems:'center',
        flexWrap: 'wrap'
    },
    filterInput: {
        width: '46%',
        maxHeight: 50
    },
    ratingInput: {
        flexDirection: 'row',
        gap: 15,
        alignItems:'center',
        flexWrap: 'wrap',
        width: '100%'
    }
})
export default function CategoryDetail({category}) {
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(true);
    
    const [ratingFilter, setRatingFilter] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
    })
    const [products, setProducts] = useState([])

    const onRefresh = async () => {
        setProducts(data)
        setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [])

  

    if(refreshing) return <Loading />

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing} >
            <View style={{
                marginVertical: 30,
            }}>
                <ImageBackground 
                    source={{ uri: category?.image ? category.image : "https://www.hacom.vn/media/lib/chutchigame.jpg" }} 
                    style={[styles.card]}
                   >
                        <Text style={styles.title}>{category?.name ?? "test"}</Text>
                </ImageBackground>
            </View>
            <View style={{
                gap: 10
            }}>
                <View style={styles.filterItem}>
                    <Text style={{
                        fontSize: 20,
                        width: '100%',
                        fontWeight: 'bold'
                    }}>Price</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10
                    }}>
                        <TextInput keyboardType='numeric' style={styles.filterInput} placeholder='min' mode='outlined' />
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>-</Text>
                        <TextInput keyboardType='numeric' style={styles.filterInput} placeholder='max' mode='outlined' />
                    </View>
                </View>

                <View style={styles.filterItem}>
                    <Text style={{
                        fontSize: 20,
                        width: '100%',
                        fontWeight: 'bold'
                    }}>Rating</Text>
                    <View style={styles.ratingInput}>
                        <Checkbox
                            status={ratingFilter['5'] ? 'checked': 'unchecked'}
                            onPress={() => {
                                setRatingFilter(prev => {
                                    return {...prev, 5: !ratingFilter['5']}
                                })
                            }}
                        />
                        <Text style={{
                            fontSize: 20,
                        }}>🌟🌟🌟🌟🌟</Text>
                    </View>
                    <View style={styles.ratingInput}>
                        <Checkbox
                            status={ratingFilter['4'] ? 'checked': 'unchecked'}
                            onPress={() => {
                                setRatingFilter(prev => {
                                    return {...prev, 4: !ratingFilter['4']}
                                })
                            }}
                        />
                        <Text style={{
                            fontSize: 20,
                        }}>🌟🌟🌟🌟☆</Text>
                    </View>
                    <View style={styles.ratingInput}>
                        <Checkbox
                            status={ratingFilter['3'] ? 'checked': 'unchecked'}
                            onPress={() => {
                                setRatingFilter(prev => {
                                    return {...prev, 3: !ratingFilter['3']}
                                })
                            }}
                        />
                        <Text style={{
                            fontSize: 20,
                        }}>🌟🌟🌟☆☆</Text>
                    </View>
                    <View style={styles.ratingInput}>
                        <Checkbox
                            status={ratingFilter['2'] ? 'checked': 'unchecked'}
                            onPress={() => {
                                setRatingFilter(prev => {
                                    return {...prev, 2: !ratingFilter['2']}
                                })
                            }}
                        />
                        <Text style={{
                            fontSize: 20,
                        }}>🌟🌟☆☆☆</Text>
                    </View>
                    <View style={styles.ratingInput}>
                        <Checkbox
                            status={ratingFilter['1'] ? 'checked': 'unchecked'}
                            onPress={() => {
                                setRatingFilter(prev => {
                                    return {...prev, 1: !ratingFilter['1']}
                                })
                            }}
                        />
                        <Text style={{
                            fontSize: 20,
                        }}>🌟☆☆☆☆</Text>
                    </View>

                </View>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: 10,
                marginVertical: 15
            }}>
                {
                    products.map(product => <ProductItem key={product.id} product={product} />)
                }
            </View>
        </DefaultLayout>
    )
}

