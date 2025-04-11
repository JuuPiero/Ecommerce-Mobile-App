import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CategoryCard from "../../components/dashboard/CategoryCard";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/api";
import Loading from "../../components/Loading";
import { decodeEntities } from "../../utils/utils";

export default function Categories({onReset}) {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    
    const [categories, setCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])
    // const t = {}
    
    const onRefresh = async () => {
        setRefreshing(true);
        getCategories()
    };

    async function getCategories() {
        try {
            const response = await axios.get(API_URL + "/api/v1/categories?page=" + currentPage)
            setPages(response.data.links)
            setCategories(response.data.data)
            setRefreshing(false);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        onRefresh()
    }, [currentPage])

    if(refreshing) return <Loading />

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing}>
            {/* <Button mode="contained" onPress={getCategories}>Reset</Button> */}
            <View style={{ padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text role='heading' style={{fontSize: 30}} >Categories</Text>
                <Button mode='contained' onPress={e => {
                    navigation.navigate('CreateCategory')
                }}>New Category</Button>        
            </View>
            
            {
                categories.map(category => <CategoryCard key={category.id} category={category} />)
            }

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
        </DefaultLayout>
    )
}

const styles = StyleSheet.create({
    active: {
        fontSize: 10,
        // color: '#000',
        fontWeight: 'bold'
    }
})