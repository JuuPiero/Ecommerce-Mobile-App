import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CategoryCard from "../../components/dashboard/CategoryCard";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/api";

export default function Categories() {
    const navigation = useNavigation();

    const [categories, setCategories] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get(API_URL + "/api/v1/category/all")
                
                setCategories(response.data.categories)
                setIsLoaded(true)
            } catch (error) {
                console.log(error)
            }
        }
        getCategories()
    })

    if(!isLoaded) return <Text>Loading ...</Text>

    return (
        <DefaultLayout >
            <ScrollView >
                <View style={{ padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text role='heading' style={{fontSize: 30}} >Categories</Text>
                    <Button mode='contained' onPress={e => {
                        navigation.navigate('CreateCategory')
                    }}>New Category</Button>        
                </View>
                {
                    categories.map(category => <CategoryCard key={category.id} category={category} />)
                }

            </ScrollView>
        </DefaultLayout>
    )
}
