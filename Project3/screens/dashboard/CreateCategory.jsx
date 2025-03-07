import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { TextInput, Button, Card, Title, Paragraph, Text } from "react-native-paper";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import api, { API_URL } from "../../api/api"

const CreateCategory = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setFormData({ ...formData, image: result.assets[0].uri });
        }
    };


    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        console.log("Submitted Data:", formData);
        if (!formData.name || !formData.description || !formData.image) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
            return;
        }

        let data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("image", {
            uri: formData.image,
            name: Date.now() + ".jpg",
            type: "image/jpeg",
        })

        try {
            const response = await axios.post(API_URL + "/api/v1/category/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // Authorization: 
                },
            });
      
            Alert.alert("Thành công", `Server phản hồi: ${response.data.message}`);
            setFormData({
                name: "",
                description: "",
                image: null,
            });
        } catch (error) {
            console.error("Lỗi khi tải lên:", error);
            Alert.alert("Lỗi", "Không thể tải dữ liệu lên");
        }
    };
    return (
        <DefaultLayout>
            <View >
                <Card >
                 
                    <Card.Content>
                        <Title style={styles.title}>Thêm danh mục</Title>
                        <TextInput
                            // label="Họ và Tên"
                            placeholder="Enter name"
                            value={formData.name}
                            onChangeText={(text) => handleChange("name", text)}
                            style={styles.input}
                            mode="outlined"
                        />
                        <TextInput
                            placeholder="Enter description"
                            value={formData.description}
                            onChangeText={(text) => handleChange("description", text)}
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
                        {formData.image && <Image source={{ uri: formData.image }} style={{ width: 'auto', height: 100, marginTop: 10 }} />}
                        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                            Submit
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </DefaultLayout>
    );
};

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

export default CreateCategory;
