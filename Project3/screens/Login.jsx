import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Alert, BackHandler, ImageBackground, Text } from "react-native";
import { TextInput, Button, Card, Title, Paragraph } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";

const Login = () => {
  const navigation = useNavigation()
  const {token, login} = useContext(AuthContext)
  const [isLoaded, setIsLoaded] = useState(true)
  useEffect(() => {
        if(token) {
          navigation.navigate('Customer')
        }
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true // return true để chặn back
        );
        return () => backHandler.remove(); // cleanup khi unmount
    }, []);  

    const [formData, setFormData] = useState({
        email: "",
        pasword: "",
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
      const {email, pasword} = formData
      if(!email || !pasword) {
        Alert.alert('Nhập thiếu thông tin')
        return
      }
      
      try {
        setIsLoaded(false)
        const user = await login(email, pasword)
        if(user?.role == 'admin') {
          navigation.navigate('Admin')
        }
        else {
          navigation.navigate('Customer')
        }
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
          // alignItems: 'center'
        }} source={{
          uri: 'https://img.freepik.com/free-psd/shopping-vertical-background_23-2150409471.jpg'
          }} resizeMode="cover">
          <View style={{paddingHorizontal: 15}}>
            <Text style={styles.title}>Login</Text>
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
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Login
            </Button>
            <Button style={{
              marginTop: 20
            }}>Create new Account</Button>
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

export default Login;
