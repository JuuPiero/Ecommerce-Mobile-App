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
    const navigation = useNavigation()
    const route = useRoute()
    const { id } = route.params
    const [refreshing, setRefreshing] = useState(false);

    const [categories, setCategories] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [product, setProduct] = useState(null)
    const [attributeInputCount, setAttributeInputCount] = useState(1);

    //new attribute, new images
    const [attributes, setAttributes] = useState([])
    const [images, setImages] = useState([])


    const getCategories = async () => {
        try {
            const response = await axios.get(API_URL + "/api/v1/category/all")
            setCategories(response.data.categories)

        } catch (error) {
            console.log(error)
        }
    }

    const getProduct = async () => {
        try {
            const response = await axios.get(API_URL + '/api/v1/product/get/' + id)
            setProduct({...response.data.product, status: response.data.product.status == 1})
            setAttributeInputCount(response.data.product.attributes.length)
            setAttributes(response.data.product.attributes)
        } catch (error) {
            console.log(error)
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await getCategories()
        await getProduct()
        setRefreshing(false);
    };


    useEffect(() => {
        onRefresh()
    }, [])


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
            setImages(result.assets.map(asset => asset.uri))
        }
    }

    const onDelete = async () => {
        try {
            // Confirm

            const response = await axios.delete(API_URL + '/api/v1/product/delete/' + id)
            Alert.alert(response.data.message)
            navigation.navigate('Products')
        } catch (error) {
            console.error("Lỗi:", error)
            Alert.alert("Không thể xóa đươhc")
        }
    }

    const onSubmit = async () => {
        
        const { name, category_id, sku, price, quantity, description } = product;
        if (!name || !category_id || !sku || price <= 0 || quantity < 0 || !description) {
            Alert.alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        const data = new FormData();
        data.append("_method", "PUT")
        data.append("name", name)
        data.append("category_id",category_id)
        data.append("sku", sku)
        data.append("price", price)
        data.append("quantity", quantity)
        data.append("description", description)
        data.append("status", product.status)
        data.append("attributes", JSON.stringify(attributes))

        
        images.forEach((uri, index) => {
            const fileName = uri.split('/').pop();
            const fileType = fileName.split('.').pop();
            data.append('images[]', {
                uri,
                name: `image_${index}.${fileType}`,
                type: `image/${fileType}`,
            });
        });
    // console.log(data);  
        try {
            const response = await axios.post(API_URL + "/api/v1/product/update/" + id, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            Alert.alert("Thành công", `Server phản hồi: ${response.data}`)
        } catch (error) {
            console.error("Lỗi khi tải lên:", error)
            Alert.alert("Lỗi", "Không thể tải dữ liệu lên")
        }
    }

    if(refreshing || !product) return <Loading />

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing}>
            <Button style={styles.deleteBtn} mode='contained' onPress={onDelete}>Delete</Button>        
            <Card>
                <Card.Content>
                    <Title style={styles.title}>Cập nhật Sản phẩm</Title>
                    <View style={styles.formContainer}>
                        <TextInput value={product.name} onChangeText={text => {
                            setProduct({...product, name: text})
                        }}  placeholder="Tên sản phẩm" mode="outlined" />
                        <View style={styles.dropdown}>
                            <Picker onValueChange={categoryId => {
                                setProduct({...product, category_id: categoryId})
                            }} placeholder="Danh mục" style={styles.dropdown}>

                                {categories.map(category => <Picker.Item key={category.id} label={category.name} value={category.id} />)}
                            
                            </Picker>
                        </View>
                        <TextInput value={product.sku} onChangeText={text => {
                            setProduct({...product, sku: text})
                        }} placeholder="SKU" mode="outlined" />
                        <TextInput value={product.price} onChangeText={text => {
                            setProduct({...product, price: parseFloat(text)})
                        }} placeholder="Giá sản phẩm" mode="outlined" keyboardType="numeric" />
                        <TextInput value={product.quantity.toString()} onChangeText={text => {
                            setProduct({...product, quantity: parseInt(text)})
                        }} placeholder="Số lượng tồn kho" mode="outlined"  keyboardType="numeric" />

                        <TextInput
                            style={{height: 120}}
                            onChangeText={text => {
                                setProduct({...product, description: text})
                            }}
                            placeholder="Enter description"
                            multiline={true} 
                            numberOfLines={100} 
                            mode="outlined"
                            value={product.description}
                        />

                        <Button mode="contained-tonal" onPress={pickImages}>
                            Chọn Ảnh
                        </Button>
                  
                        {
                            images.length > 0 ? 
                            images.map((image, index) => 
                                <Image key={index} source={{ uri: image }} style={{ width: 'auto', height: 100, }} />
                            ) :
                            product.images.map((image, index) => 
                                <Image key={index} source={{ uri: API_URL + '/storage/' + image.name }} style={{ width: 'auto', height: 100, }} />
                            )
                        }

                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10
                        }}>
                            <Text style={{ fontSize: 15 }}>Status</Text>
                            <Switch value={product.status == 1} onValueChange={value => {
                                setProduct({...product, status: value})
                            }} />
                        </View>

                        <View style={styles.attributeContainer}>
                            <Title>Thêm thuộc tính</Title>
                            {Array.from({ length: attributeInputCount }).map((_, index) => (
                                <NewAtributeInput attr={product.attributes[index]} key={index} id={index} setNewAttribute={handleNewAttribute} />
                            ))}
                            
                            <Button style={{
                                width: '50%'
                            }} mode="outlined" onPress={() => setAttributeInputCount(attributeInputCount + 1)}
                            >new attribute</Button>
                            <Text>{JSON.stringify(attributes, null, 2)}</Text>
                        </View>
                    </View>
                    <Button style={{ marginTop: 15 }} mode="contained" onPress={onSubmit} >Submit</Button>
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
    deleteBtn: {
        width: '50%',
        backgroundColor: 'red',
        marginBottom: 15,
    }
})