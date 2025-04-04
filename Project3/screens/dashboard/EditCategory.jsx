import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Card, Text, TextInput, Title } from "react-native-paper";
import { Alert, Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/api";
import Loading from "../../components/Loading";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";
import * as ImagePicker from 'expo-image-picker'

export default function EditCategory() {
    const route = useRoute();
    const navigation = useNavigation()
    const { id } = route.params; // Lấy id từ params
    const [category, setCategory] = useState(null)
    const [image, setImage] = useState(null)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    useEffect(() => {
        const getCategory = async (id) => {
            const response = await axios.get(API_URL + "/api/v1/category/get/" + id)
            setCategory(response.data.category)
            console.log(response.data.category);
            
        } 
        getCategory(id)

    }, [])
    const handleDelete = async (e) => {
        try {
            const response = await axios.delete(API_URL + "/api/v1/category/delete/" + id)
            if(response.data) {
                Alert.alert("Xóa thành công")
                navigation.navigate('Categories')
            }             
        } catch (error) {
            console.log(error)
            Alert.alert("Xóa thất bại")
        }
    }
    
    const onUpdate = async (e) => {
        const data = new FormData()
      
        const { name, description } = category
        if(!name || !description) {
            Alert.alert("Không được để trống")
            return;
        }
        data.append('_method', 'PUT')
        data.append('name', name)
        data.append('description', description)
        if(image) {
            const fileName = image.split('/').pop();
            const fileType = fileName.split('.').pop();
            data.append('image', {
                uri: image,
                name: `${Date.now()}.${fileType}`,
                type: `image/${fileType}`,
            })
        }
        console.log(data);
        try {
            const response = await axios.post(API_URL + "/api/v1/category/update/" + id, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            Alert.alert("Thành công", `Server phản hồi: ${response.data.message}`)
        } catch (error) {
            console.error("Lỗi khi tải lên:", error)
            Alert.alert("Lỗi", "Không thể tải dữ liệu lên")
        }
    }

    if(!category) return <Loading />

    return (
        <DefaultLayout>
            <View >
                <Card>
                    <Card.Content>
                        <Button textColor="#fff" onPress={handleDelete} style={{backgroundColor: 'red', marginBottom: 20, width: '50%'}}>Delete</Button>
                        <TextInput
                            placeholder="Enter name"
                            value={category.name}
                            onChangeText={text => setCategory({...category, name: text})}
                            style={styles.input}
                            mode="outlined"
                        />
                        <TextInput
                            placeholder="Enter description"
                            value={category.description}
                            onChangeText={text => setCategory({...category, description: text})}
                            style={styles.input}
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={20} // Số dòng hiển thị mặc định
                            mode="outlined"
                        />
                        <Button style={{
                            borderRadius: 0
                        }} mode="contained-tonal" onPress={pickImage}>
                            Chọn Ảnh
                        </Button>
                        {
                            image !== null ? (<Image  
                            source={{uri: image}} 
                            style={{ width: 'auto', height: 100, marginTop: 10 }} />) : (<Image  
                            source={{uri: category.image?.includes('https') ? category.image : (API_URL + "/storage/" + category.image)}} 
                            style={{ width: 'auto', height: 100, marginTop: 10 }} />)
                            
                        }
                        {/* <Image  
                            source={{uri: category.image?.includes('https') ? category.image : (API_URL + "/storage/" + category.image)}} 
                            style={{ width: 'auto', height: 100, marginTop: 10 }} /> */}
                        <Button mode="contained" 
                        onPress={onUpdate} 
                        style={styles.button}>
                            Submit
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </DefaultLayout>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 12,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    // textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subtitle: {
    textAlign: "center",
    color: "gray",
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    width: '100%',
    // width: '50%',
    marginTop: 10,
    margin: 'auto'
    // padding: 8,
  },
});
