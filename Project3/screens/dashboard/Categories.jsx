import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CategoryCard from "../../components/dashboard/CategoryCard";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/api";
import Loading from "../../components/Loading";

export default function Categories({onReset}) {
    const navigation = useNavigation();

    const [categories, setCategories] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        getCategories()
    };

    async function getCategories() {
        try {
            const response = await axios.get(API_URL + "/api/v1/category/all")
            setCategories(response.data.categories)
            setRefreshing(false);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        onRefresh()
    }, [])

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

        </DefaultLayout>
    )
}
