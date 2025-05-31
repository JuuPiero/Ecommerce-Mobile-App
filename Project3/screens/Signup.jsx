import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Alert, BackHandler, ImageBackground, Text } from "react-native";
import { TextInput, Button, Card, Title, Paragraph } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import api from "../api/api";

const Signup = () => {
    const navigation = useNavigation()
    const [isLoaded, setIsLoaded] = useState(true)
    useEffect(() => {
        
    }, []);  

    const [formData, setFormData] = useState({
        email: "",
        pasword: "",
        full_name: "",
        phone_number: "",
        address: ""
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
      const {email, pasword, phone_number, full_name} = formData
      if(!email || !pasword || !phone_number || !full_name) {
        Alert.alert('Nhập thiếu thông tin')
        return
      }
      
      try {
        setIsLoaded(false)
        const response = await api.post('api/v1/signup', {
            ...formData
        })
        if(response.success) {
            navigation.navigate('Login')
        }
        setIsLoaded(true)

      } catch (error) {
        Alert.alert(error.message)
      }
    };

    if(!isLoaded) {
      return <Loading />
    }

    return (
        <ImageBackground style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center'
        }} source={{
          uri: 'https://img.freepik.com/free-psd/shopping-vertical-background_23-2150409471.jpg'
          }} resizeMode="cover">
          <View style={{paddingHorizontal: 15}}>
            <Text style={styles.title}>Signup</Text>

            <TextInput
                label="Họ và Tên"
                value={formData.full_name}
                onChangeText={(text) => handleChange("full_name", text)}
                style={styles.input}
                // mode="outlined"
            />
            <TextInput
                label="Số điện thoại"
                value={formData.phone_number}
                onChangeText={(text) => handleChange("phone_number", text)}
                keyboardType="phone-pad"
                style={styles.input}
                // mode="outlined"
            />
            <TextInput
                label="Email"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
                style={styles.input}
                // mode="outlined"
            />
            <TextInput
                value={formData.pasword}
                // mode="outlined"
                label="Password"
                secureTextEntry
                onChangeText={(text) => handleChange("pasword", text)}
                right={<TextInput.Icon icon="eye" />}
            />

            <TextInput
                style={{
                    minHeight: 100,
                    marginTop: 15
                }}
                value={formData.address}
                // mode="outlined"
                multiline={true}
                label="Địa chỉ"
                secureTextEntry
                onChangeText={(text) => handleChange("address", text)}
            />
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Signup
            </Button>
            <Button onPress={e => {
                navigation.navigate('Login')
            }} style={{
              marginTop: 20
            }}>Go to Login</Button>
          </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
  title : {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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

export default Signup;
