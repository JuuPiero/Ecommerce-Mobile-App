import { Button, Card, Switch, Text, TextInput, Title } from "react-native-paper"
import DefaultLayout from "../../layouts/dashboard/DefaultLayout"
import { Alert, Image, StyleSheet, View } from "react-native"
import { useEffect, useState } from "react"
import { Picker } from "@react-native-picker/picker"
import axios from "axios"
import { API_URL } from "../../api/api"
import Loading from "../../components/Loading"
import NewAtributeInput from "../../components/dashboard/NewAtributeInput"

import * as ImagePicker from 'expo-image-picker'
import { useNavigation, useRoute } from "@react-navigation/native"

export default function EditProduct() {
    const route = useRoute()
    const navigation = useNavigation()
    
    const { id } = route.params

    const [categories, setCategories] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [product, setProduct] = useState(null)
    const [attributeInputCount, setAttributeInputCount] = useState(1);
    const [attributes, setAttributes] = useState([])


    


    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get(API_URL + "/api/v1/category/get/")
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
        description: "",
        images: [],
        status: true,
    })


    const handleNewAttribute = (id, data) => {
        setAttributes(prevAttributes => {
            const existingIndex = prevAttributes.findIndex(attr => attr.id === id);
            if (existingIndex !== -1) {
                const updatedAttributes = [...prevAttributes];
                updatedAttributes[existingIndex] = { ...prevAttributes[existingIndex], ...data };
                return updatedAttributes;
            } else {
                return [...prevAttributes, { id, ...data }];
            }
        })
    }

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        })

        if (!result.canceled) {
            setFormData({ 
                ...formData, 
                images: [...(formData.images || []), ...result.assets.map(asset => asset.uri)] 
            })
        }
    }

    const onSubmit = async () => {
        const { name, category_id, sku, price, quantity, description, images } = formData;
        if (!name || !category_id || !sku || price <= 0 || quantity < 0 || !description || images.length === 0) {
            Alert.alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        console.log(JSON.stringify({
            ...formData,
            attributes: JSON.stringify(attributes)
        }))

        const data = new FormData();
        data.append("name", name)
        data.append("category_id",category_id)
        data.append("sku", sku)
        data.append("price", price)
        data.append("quantity", quantity)
        data.append("description", description)

        images.forEach((uri, index) => {
            const fileName = uri.split('/').pop();
            const fileType = fileName.split('.').pop();
            data.append('images[]', {
                uri,
                name: `image_${index}.${fileType}`,
                type: `image/${fileType}`,
            });
        });
        data.append("attributes", JSON.stringify(attributes))
        
        try {
            const response = await axios.post(API_URL + "/api/v1/product/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            Alert.alert("Thành công", `Server phản hồi: ${response.data}`)
            setFormData({
                name: "",
                category_id: 0,
                sku: "",
                price: 0,
                quantity: 0,
                description: "",
                images: [],
                status: true,
            })
            setAttributes([])
            setAttributeInputCount(1)

        } catch (error) {
            console.error("Lỗi khi tải lên:", error)
            Alert.alert("Lỗi", "Không thể tải dữ liệu lên")
        }
    }
    if(!isLoaded) return <Loading />

    return (
        <DefaultLayout>
            <Card>
                <Card.Content>
                    <Title style={styles.title}>Thêm Sản phẩm</Title>
                    <View style={styles.formContainer}>
                        <TextInput onChangeText={text => {
                            setFormData({...formData, name: text})
                        }}  placeholder="Tên sản phẩm" mode="outlined" />
                        <View style={styles.dropdown}>
                            <Picker onValueChange={categoryId => {
                                setFormData({...formData, category_id: categoryId})
                            }} placeholder="Danh mục" style={styles.dropdown}>
                                {
                                    categories.map(category => <Picker.Item key={category.id} label={category.name} value={category.id} />)
                                }
                            </Picker>
                        </View>
                        <TextInput onChangeText={text => {
                            setFormData({...formData, sku: text})
                        }} placeholder="SKU" mode="outlined" />
                        <TextInput onChangeText={text => {
                            setFormData({...formData, price: parseFloat(text)})
                        }} placeholder="Giá sản phẩm" mode="outlined" keyboardType="numeric" />
                        <TextInput onChangeText={text => {
                            setFormData({...formData, quantity: parseInt(text)})
                        }} placeholder="Số lượng" mode="outlined"  keyboardType="numeric" />

                        <TextInput
                            onChangeText={text => {
                                setFormData({...formData, description: text})
                            }}
                            placeholder="Enter description"
                            multiline={true} 
                            numberOfLines={100} 
                            mode="outlined"
                        />

                        <Button mode="contained-tonal" onPress={pickImages}>
                            Chọn Ảnh
                        </Button>
                        {formData.images.map((image, index) => 
                            <Image key={index} source={{ uri: image }} style={{ width: 'auto', height: 100, }} />
                        )}

                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10
                        }}>
                            <Text style={{ fontSize: 15 }}>Status</Text>
                            <Switch value={formData.status} onValueChange={value => {
                                setFormData({...formData, status: value})
                            }} />
                        </View>

                        <View style={styles.attributeContainer}>
                            <Title>Thêm thuộc tính</Title>
                            {Array.from({ length: attributeInputCount }).map((_, index) => (
                                <NewAtributeInput key={index} id={index} setNewAttribute={handleNewAttribute} />
                            ))}
                            

                            <Button style={{
                                width: '50%'
                            }} mode="outlined" onPress={() => setAttributeInputCount(attributeInputCount + 1)}
                            >new attribute</Button>
                            <Text>{JSON.stringify(attributes, null, 2)}</Text>
                        </View>

                    </View>
                    <Button style={{
                        marginTop: 15
                    }} mode="contained" onPress={onSubmit} >Submit</Button>
                </Card.Content>
            </Card>
        </DefaultLayout>
    )
}
const styles = StyleSheet.create({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20
    },

    dropdown: {
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid'
    },
    title: {
        fontWeight: 'bold'
    },
    attributeContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
})