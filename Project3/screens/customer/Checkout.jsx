import { Button, Card, Switch, Text, TextInput, Title } from "react-native-paper"
import { Alert, Image, StyleSheet, View } from "react-native"
import { useEffect, useState } from "react"
import { Picker } from "@react-native-picker/picker"
import axios from "axios"
import { API_URL } from "../../api/api"
import Loading from "../../components/Loading"
import NewAtributeInput from "../../components/dashboard/NewAtributeInput"

import * as ImagePicker from 'expo-image-picker'
import DefaultLayout from "../../layouts/customer/DefaultLayout"
import CartManager from "../../utils/CartManager"

const paymentMethods = [
    {id: 1, name: "Thanh toán khi nhận hàng"},
    {id: 2, name: "Momo"},
    {id: 2, name: "VNPay"},
]

export default function Checkout() {

    const [cart, setCart] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        payment_method: null,
        phone_number: "",
        address: "",
        note: "",
        order_items: [],
    })
    useEffect(() => {
        const getCart = async() => {
            const cart = await CartManager.get()
            setCart(cart)

            setFormData(prev => {
                return {...prev, 
                    order_items: cart.reduce((current, item) => {
                        current.push({
                        id: item.id,
                        quantity: item.quantity
                        });
                        return current;
                }, [])}
            })
        }
        getCart()
    }, [])


    const onCheckout = async () => {
        console.log(formData);
        return
        const { name, payment_method, phone_number, address } = formData;
        if (!name || !payment_method || !phone_number || !address ) {
            Alert.alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        
        try {
            
           
        } catch (error) {
        
        }
    }
    if(!cart) return <Loading />

    return (
        <DefaultLayout>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 30
            }}>Checkout</Text>
            <Card>
                <Card.Content>
                    <View style={styles.formContainer}>
                        <TextInput onChangeText={text => {
                            setFormData({...formData, name: text})
                        }}  placeholder="Tên người nhận" mode="outlined" />
                        <View style={styles.dropdown}>
                            <Picker onValueChange={paymentMethod => {
                                setFormData({...formData, payment_method: paymentMethod})
                            }} placeholder="Danh mục" style={styles.dropdown}>
                                {
                                    paymentMethods.map(paymentMethod => <Picker.Item key={paymentMethod.id} label={paymentMethod.name} value={paymentMethod.id} />)
                                }
                            </Picker>
                        </View>
                        <TextInput onChangeText={text => {
                            setFormData({...formData, sku: text})
                        }} placeholder="Số điện thoại" mode="outlined" />
                   
                        <TextInput
                            style={{
                                minHeight: 180
                            }}
                            onChangeText={text => {
                                setFormData({...formData, description: text})
                            }}
                            placeholder="Địa chỉ nhận hàng"
                            multiline={true} 
                            numberOfLines={100} 
                            mode="outlined"
                        />

                        <TextInput
                            style={{
                                minHeight: 150
                            }}
                            onChangeText={text => {
                                setFormData({...formData, description: text})
                            }}
                            placeholder="Ghi chú"
                            multiline={true} 
                            numberOfLines={100} 
                            mode="outlined"
                        />

                        <View>
                            {cart.map(item => (
                                <Text key={item.id}>{item.product.name} x {item.quantity}</Text>
                            ))}
                            <Text style={styles.totalAmount}>Total Amount: {cart.reduce((sum, item) => {
                                return sum + (item.product.price * item.quantity)
                            }, 0)}đ</Text>
                        </View>

                    </View>
                    <Button style={{
                        marginTop: 15,
                        borderRadius: 10,
                        paddingVertical: 8,
                    }} mode="contained" onPress={onCheckout} >Checkout</Button>
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
    totalAmount: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20
    }
})