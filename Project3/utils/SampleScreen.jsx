import { Image, Pressable, StyleSheet, Text, Touchable, View } from 'react-native'
import { Button, Title } from 'react-native-paper';
import DefaultLayout from '../../layouts/customer/DefaultLayout';
import CartItem from '../../components/customer/CartItem';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CartManager from '../../utils/CartManager';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SampleScreen() {
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(true);
   
    const onRefresh = async () => {
       
        setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [])

  

    if(refreshing) return <Loading />

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing} style={{
            backgroundColor: '#eee',
        }}>
           
        </DefaultLayout>
    )
}
