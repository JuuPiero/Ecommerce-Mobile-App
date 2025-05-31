import { Image, Pressable, StyleSheet, Text, Touchable, View } from 'react-native'
import { Button, TextInput, Title } from 'react-native-paper';
import DefaultLayout from '../../layouts/customer/DefaultLayout';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons'; 

export default function Profile() {
    const navigation = useNavigation()
    const {user, logout} = useContext(AuthContext)

    const [userData, setUser] = useState(user)

    const [refreshing, setRefreshing] = useState(true);
   
    const onRefresh = async () => {
       
        setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [])

    if(refreshing) return <Loading />

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing}>
            <View>
                <Title style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 25,
                    marginVertical: 20,
                    alignItems: 'center'
                }}>Profile</Title>
                <Button onPress={async () => {
                    await logout()
                    navigation.replace('Login')
                }} mode='contained' style={{backgroundColor: 'red', width: '30%', position: 'absolute', right: 0, bottom: 0}}>Logout</Button>
               
            </View>
         
            <View style={{
                alignSelf: 'center',
                flex: 1,
            }}>
                <Ionicons style={{
                    padding: 30,
                    borderWidth: 3,
                    borderRadius: 100
                }} size={50} name="person" />
               
               
            </View>
          
            <View style={{
                gap: 10,
                marginTop: 50,
                justifyContent: 'center',
            }}>
                    {/* user?.role == 'admin' ? : null */}

                {
                     
                    <Button style={{width: '50%'}} onPress={async () => {
                        navigation.navigate('Admin')
                    }} mode='contained' >Go to dashboard</Button>
                }
                <TextInput
                    // onChangeText={text => {
                    //     setFormData({...formData, description: text})
                    // }}
                    placeholder="Email"
                    mode="flat"
                    readOnly
                    value={user?.email}
                />

                <TextInput
                    // onChangeText={text => {
                    //     setFormData({...formData, description: text})
                    // }}
                    placeholder="Tên"
                    mode="outlined"
                    value={user?.full_name}
                />

                <TextInput
                    // onChangeText={text => {
                    //     setFormData({...formData, description: text})
                    // }}
                    placeholder="Số điện thoại"
                    mode="outlined"
                    value={user?.phone_number}

                />
                <TextInput
                    style={{
                        minHeight: 180
                    }}
                    // onChangeText={text => {
                    //     setFormData({...formData, description: text})
                    // }}
                    placeholder="Địa chỉ"
                    multiline={true} 
                    numberOfLines={100} 
                    mode="outlined"
                />
                <Button mode='contained'>Save Change</Button>
            </View>
        </DefaultLayout>
    )
}
