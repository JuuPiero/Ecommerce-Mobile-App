import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title, Paragraph, Text } from "react-native-paper";

const Login = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        console.log("Submitted Data:", formData);
    };
    return (
        <View >
            <Card >
                <Card.Content>
                <Title style={styles.title}>Nhập Thông Tin Sản Phẩm</Title>
                <TextInput
                    // label="Họ và Tên"
                    placeholder="Enter name"
                    value={formData.name}
                    onChangeText={(text) => handleChange("name", text)}
                    style={styles.input}
                    mode="outlined"
                />
                <TextInput
                    label="Email"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                    keyboardType="email-address"
                    style={styles.input}
                    mode="outlined"
                />
                <TextInput
                    label="Số Điện Thoại"
                    value={formData.phone}
                    onChangeText={(text) => handleChange("phone", text)}
                    keyboardType="phone-pad"
                    style={styles.input}
                    mode="outlined"
                />
                <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                    Gửi
                </Button>
                </Card.Content>
            </Card>
        </View>
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
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
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
    marginTop: 10,
    borderRadius: 8,
  },
});

export default Login;
