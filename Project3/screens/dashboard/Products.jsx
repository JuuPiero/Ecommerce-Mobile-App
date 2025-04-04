import { Image, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Table from '../../components/dashboard/Table';
import ProductCard from '../../components/dashboard/ProductCard';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api/api';
import Loading from '../../components/Loading';
const data = [
  { id: 1, name: "Sản phẩm A", price: 100000, quantity: 10 },
  { id: 2, name: "Sản phẩm B", price: 150000, quantity: 5 },
  { id: 3, name: "Sản phẩm C", price: 200000, quantity: 20 },
  { id: 4, name: "Sản phẩm D", price: 50000, quantity: 15 },
  { id: 5, name: "Sản phẩm E", price: 75000, quantity: 8 },
];

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
      const response = await axios.get(API_URL + "/api/v1/products")
      console.log(response.data.data);
      setProducts(response.data.data)
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
            <Button mode='contained' onPress={e => {
              navigation.navigate('CreateProduct')
            }}>New Products</Button>        
          </View>
          {
            products.map(product => <ProductCard product={product} key={product.id} />)
          }

          {
            data.map(product => <ProductCard product={product} key={product.id} />)
          }
       
          <View style={{ padding: 20, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            {/* <Button mode='contained'>First</Button>  */}
            <Button mode='text'>1</Button>
            <Button mode='text' textColor='gray'>2</Button>
            <Button mode='text' textColor='gray'>10</Button> 
            {/* <Button mode='contained'>Next</Button>         */}
          </View>
          {/* <Table /> */}
        </ScrollView>
      </DefaultLayout>
    )     
}
