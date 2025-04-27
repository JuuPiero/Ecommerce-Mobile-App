import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Table from '../../components/dashboard/Table';
import ProductCard from '../../components/dashboard/ProductCard';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api/api';
import Loading from '../../components/Loading';
import { decodeEntities } from '../../utils/utils';
import { Ionicons } from '@expo/vector-icons'; 


export default function Products() {
    const navigation = useNavigation()
    const [products, setProducts] = useState([])

    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])

    const onRefresh = async () => {
        setRefreshing(true);
        getProducts()
    };


    const getProducts = async () => {
      const response = await axios.get(API_URL + "/api/v1/products?category_id=null&page=" + currentPage)
      setProducts(response.data.data)
      setPages(response.data.links)
      
      setRefreshing(false)
    }
    useEffect(() => {
      getProducts()
     
    }, [currentPage])

    if(refreshing) return <Loading />

    return (
      <DefaultLayout onRefresh={onRefresh} refreshing={refreshing}>
        <ScrollView >
          <View style={{ padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text role='heading' style={{fontSize: 30}} >Products</Text>
            <Button style={{borderWidth: 2}} mode='contained' onPress={e => {
              navigation.navigate('CreateProduct')
            }}>New Product</Button>        
          </View>
          {products.map(product => <ProductCard product={product} key={product.id} />)}
       
          <View style={{
                flexDirection: "row",
                justifyContent: 'center'
            }}>
                {
                  pages.map((page, index) => <Button textColor={page.active ? 'red' : ''} style={page.active ? styles.active : {}} onPress={e => {
                      setCurrentPage(parseInt(page.label.substr(page.label.length - 1)))
                  }} key={index}>{decodeEntities(page.label)}</Button>)
                }
          </View>
       
        </ScrollView>
      </DefaultLayout>
    )     
}
const styles = StyleSheet.create({
    active: {
        fontSize: 10,
        fontWeight: 'bold'
    }
})