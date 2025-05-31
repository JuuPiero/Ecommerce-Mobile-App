import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CategoryCard from "../../components/dashboard/CategoryCard";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import api, { API_URL } from "../../api/api";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

export default function Categories({onReset}) {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    
    const [categories, setCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])
  
    const onRefresh = async () => {
        setRefreshing(true);
        await getCategories()
        setRefreshing(false);
    };

    async function getCategories() {
        try {
            const response = await api.get("api/v1/categories?page=" + currentPage)
            setPages(response.data.links)
            setCategories(response.data.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        onRefresh()
    }, [currentPage])

    if(refreshing) return <Loading />

    return (
        <DefaultLayout refreshing={refreshing}>
            <View style={{ padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text role='heading' style={{fontSize: 30}} >Categories</Text>
                <Button mode='contained' onPress={e => {
                    navigation.navigate('CreateCategory')
                }}>New Category</Button>        
            </View>
            
            {
                categories.map(category => <CategoryCard key={category.id} category={category} />)
            }
            <Pagination links={pages} onPageChange={setCurrentPage} />
        </DefaultLayout>
    )
}
