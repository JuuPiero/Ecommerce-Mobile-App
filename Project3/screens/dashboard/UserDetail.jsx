import { Image, Pressable, ScrollView, StyleSheet, Text, Touchable, View } from 'react-native'
import { Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CartManager from '../../utils/CartManager';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';
import ProfileCard from '../../components/dashboard/ProfileCard';
import api from '../../api/api';
import { decodeEntities } from '../../utils/utils';

export default function UserDetail() {
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(true);

    const loadUser = async() => {
        try {
       
        } catch (error) {
            
        }
    }

    const onRefresh = async () => {
        await loadUser()
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
            <ScrollView>

              
            </ScrollView>

        </DefaultLayout>
    )
}

