import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
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
import { Picker } from '@react-native-picker/picker';
import Pagination from '../../components/Pagination';


export default function Products() {
    const navigation = useNavigation()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [filterCategory, setFilterCategory] = useState(null)
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])

    const onRefresh = async () => {
        setRefreshing(true);
        await getProducts()
        await getCategories()
        setRefreshing(false)
    };


    const getProducts = async () => {
      try {
        const response = await axios.get(API_URL + "/api/v1/products?" + "page=" + currentPage)
        setProducts(response.data.data)
        setPages(response.data.links)
        
      } catch (error) {
        Alert.alert(error.message)
      }
    }
    const getCategories = async () => {
      try {
        const response = await axios.get(API_URL + "/api/v1/category/all")
        setCategories(response.data.categories)
        
      } catch (error) {
        Alert.alert(error.message)
        
      }
    }
    useEffect(() => {
      onRefresh()
    }, [currentPage])

    if(refreshing) return <Loading />

    const filteredProducts = filterCategory
    ? products.filter((product) => product.category_id === filterCategory)
    : products;

    return (
      <DefaultLayout onRefresh={onRefresh} refreshing={refreshing}>
        <View>
          <View style={{ padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text role='heading' style={{fontSize: 30}} >Sản phẩm</Text>
            <Button style={{borderWidth: 2}} mode='contained' onPress={e => {
              navigation.navigate('CreateProduct')
            }}>New Product</Button>        
          </View>
          <View style={{ padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
             <Picker selectedValue={filterCategory} onValueChange={category => {
                setFilterCategory(category)
              }} placeholder="Danh mục" style={styles.dropdown}>
                  <Picker.Item  label={'Danh mục'} value={null}/>
                  {
                    categories.map(category => <Picker.Item key={category.id} label={category.name} value={category.id}  />)
                  }
              </Picker>
          </View>

          {filteredProducts.map(product => <ProductCard product={product} key={product.id} />)}
       

          <Pagination links={pages} onPageChange={setCurrentPage} />
       
        </View>
      </DefaultLayout>
    )     
}
const styles = StyleSheet.create({
  dropdown: {
      width: '50%'
  },
})