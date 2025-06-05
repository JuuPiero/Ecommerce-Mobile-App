import { useNavigation } from "@react-navigation/native";
import { Alert, View } from "react-native"
import ProductItem from "../../components/customer/ProductItem";
import DefaultLayout from "../../layouts/customer/DefaultLayout";
import CategorySlider from "../../components/customer/CategorySlider";
import { useEffect, useState } from "react";
import axios from "axios";
import api, { API_URL } from "../../api/api";
import Pagination from "../../components/Pagination";


export default function Home() {
    
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])

    const getProducts = async () => {
        try {
            setRefreshing(true)
            const response = await axios.get(API_URL + "/api/v1/products?" + "page=" + currentPage)
            setProducts(response.data.data)
            setPages(response.data.links)
        } catch (error) {
            Alert.alert(error.message)
            setRefreshing(false)
        }
    }

    async function getCategories() {
        try {
            setRefreshing(true)
            const response = await api.get("api/v1/category/all")
            setCategories(response.data.categories)
        } catch (error) {
            Alert.alert(error.message)
            setRefreshing(false)
        }
    }
    
    const onRefresh = async () => {
        await getProducts()
        await getCategories()
        setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [currentPage])


    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing}>
            <CategorySlider categories={categories} />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: 10,
            }}>
                { products.map(product => <ProductItem key={product.id} product={product} />)}
            </View>

            <Pagination links={pages} onPageChange={setCurrentPage} />
        </DefaultLayout>
    )
  
}