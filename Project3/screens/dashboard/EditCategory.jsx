import { useRoute } from "@react-navigation/native";
import { Button, Card, Text, TextInput, Title } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/api";
import Loading from "../../components/Loading";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";

export default function EditCategory() {
    const route = useRoute();
    const { id } = route.params; // Lấy id từ params
    const [category, setCategory] = useState(null)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            // setFormData({ ...formData, image: result.assets[0].uri });
        }
    };
    useEffect(() => {
        const getCategory = async (id) => {
            const response = await axios.get(API_URL + "/api/v1/category/get/" + id)
            setCategory(response.data.category)
            
        } 
        getCategory(id)

    }, [])
    
    if(!category) return <Loading />

    return (
        <DefaultLayout>
            <View >
                <Card>
                    <Card.Content>
                        <Title style={styles.title}>Thêm danh mục</Title>
                        <TextInput
                            // label="Họ và Tên"
                            placeholder="Enter name"
                            value={category.name}
                            // onChangeText={(text) => handleChange("name", text)}
                            style={styles.input}
                            mode="outlined"
                        />
                        <TextInput
                            placeholder="Enter description"
                            value={category.description}
                            // onChangeText={(text) => handleChange("description", text)}
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
                        <Image  
                            source={{uri: category.image?.includes('https') ? category.image : (API_URL + "/storage/" + category.image)}} 
                            style={{ width: 'auto', height: 100, marginTop: 10 }} />
                        <Button mode="contained" 
                        // onPress={handleSubmit} 
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
