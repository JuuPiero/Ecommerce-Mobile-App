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

export default function Users() {
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(true);

    const [users, setUsers] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(1)

    const loadUsers = async() => {
        try {
            const response = await api.get('api/v1/users?page=' + currentPage)
            setUsers(response.data.users.data)
            setPages(response.data.users.links)
            console.log(users);
            

        } catch (error) {
            
        }
    }

    const onRefresh = async () => {
        await loadUsers()
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

                {
                    users.map(user => <ProfileCard key={user.id} user={user} />)
                }

                <View style={{
                    flexDirection: "row",
                    justifyContent: 'center'
                }}>
                    {
                    pages.map((page, index) => <Button textColor={page.active ? 'red' : ''} style={page.active ? styles.active : {}} onPress={e => {
                        // setCurrentPage(parseInt(page.label.substr(page.label.length - 1)))
                    }} key={index}>{decodeEntities(page.label)}</Button>)
                    }
                </View>
            </ScrollView>

        </DefaultLayout>
    )
}

const styles = StyleSheet.create({
    active: {
        fontSize: 10,
        fontWeight: 'bold'
    }
})