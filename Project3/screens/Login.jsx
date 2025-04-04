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

      try {
        
      } catch (error) {
        
      }

    };
    return (
        <SafeAreaView style={{
          margin: 10,
          position: 'absolute',
          left: 0,
          right: 0,
          top: '20%',
        }}>
            <Card style={{
              paddingVertical: 30
            }}>
                <Card.Content>
                  <Title style={styles.title}>Login</Title>
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
                  <Button style={{
                    marginTop: 20
                  }}>Create new Account</Button>
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
    borderWidth: 0,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
  },
});

export default Login;
