import { Button, Card, Switch, Text, TextInput, Title } from "react-native-paper";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { API_URL } from "../../api/api";

const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid'
    },
    title: {
        fontWeight: 'bold'
    }
    
})

export default function CreateProduct() {

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
    }, [])


    const [formData, setFormData] = useState({
        name: "",
        category_id: 0,
        sku: "",
        price: 0,
        quantity: 0,
        status: true
    })

    const onSubmit = async () => {
        Alert.alert("thêm sản phẩm")
    }
    if(!isLoaded) return <Text>Loading ...</Text>

    return (
        <DefaultLayout>
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title style={styles.title}>Thêm Sản phẩm</Title>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20
                        }}>
                            <TextInput placeholder="Tên sản phẩm" mode="outlined" />;
                            <View style={styles.dropdown}>
                                <Picker placeholder="Danh mục" style={styles.dropdown}>
                                    {
                                        categories.map(category => <Picker.Item key={category.id} label={category.name} value={category.id} />)
                                    }

                                </Picker>;
                            </View>
                            <TextInput placeholder="Enter sku" mode="outlined" />

                            <TextInput placeholder={"Giá sản phẩm"} mode="outlined" keyboardType="numeric" />
                            <TextInput placeholder="Số lượng" mode="outlined"  keyboardType="numeric" />

                            <TextInput
                                placeholder="Enter description"
                                multiline={true} 
                                numberOfLines={100} 
                                mode="outlined"
                            />

                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10
                            }}>
                                <Text style={{
                                    fontSize: 15
                                }}>Status</Text>
                                <Switch value={formData.status} />;
                            </View>
                            <Button onPress={e => {
                                onSubmit()
                            }} mode="contained">Submit</Button>
                        </View>
                    </Card.Content>
                </Card>
            </ScrollView>
        </DefaultLayout>
    )
}
