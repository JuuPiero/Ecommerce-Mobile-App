import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { TextInput, Button, Card, Title, Paragraph, Text } from "react-native-paper";

const Login = () => {
    const navigation = useNavigation()
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
      navigation.navigate('Admin')
    };
    return (
        <SafeAreaView style={{
          margin: 10,
          position: 'absolute',
          left: 0,
          right: 0,
          top: '20%',
          transform: 'translateY(-50%)',
        }}>
            <Card style={{
              paddingVertical: 30
            }}>
                <Card.Content>
                <Title style={styles.title}>ĐĂNG NHẬP</Title>
                {/* <TextInput
                    label="Họ và Tên"
                    value={formData.name}
                    onChangeText={(text) => handleChange("name", text)}
                    style={styles.input}
                    mode="outlined"
                /> */}
                <TextInput
                    label="Email"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                    keyboardType="email-address"
                    style={styles.input}
                    mode="outlined"
                />
                <TextInput
                    label="Mật khẩu"
                    value={formData.phone}
                    onChangeText={(text) => handleChange("phone", text)}
                    keyboardType="phone-pad"
                    style={styles.input}
                    mode="outlined"
                />
                <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                    Login
                </Button>
                </Card.Content>
            </Card>
        </SafeAreaView>
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
