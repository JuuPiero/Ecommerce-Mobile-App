import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, Touchable, View } from 'react-native'
import { Button, DataTable, TextInput, Title } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CartManager from '../../utils/CartManager';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';
import ProfileCard from '../../components/dashboard/ProfileCard';
import api, { API_URL } from '../../api/api';
import { dateFormat, decodeEntities, formatMoneyVN } from '../../utils/utils';
import { Picker } from '@react-native-picker/picker';
import Table from '../../components/dashboard/Table';

export default function UserDetail() {
    const route = useRoute()
    const {userData} = route.params

    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(true);
    const [user, setUser] = useState(userData)
    const loadUser = async() => {
        try {
            const response = await api.get("api/v1/user/detail/" + user.id)
            setUser(response.data.user)
            
        } catch (error) {
            Alert.alert(error?.message)
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
    

    const onSave = async() => {
        try {
            setRefreshing(true)
            const response = await api.post('api/v1/user/update/' + user.id, user)
            setRefreshing(false)
            Alert.alert(response.data.message)
        } catch (error) {
            Alert.alert(error.message)
            setRefreshing(false)
        }
    }

    
    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing} style={{
           backgroundColor: '#fff'
        }}>
            <View style={{
              
            }}>
                <Text style={[styles.title, {fontSize: 30}]}>Thông tin cá nhân</Text>
                
                <View style={styles.block}>
                    <View style={styles.field}>
                        <Text style={styles.fieldKey}>ID:</Text>
                        <Text style={styles.fieldValue}>#{user.id}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldKey}>Email:</Text>
                        <Text style={styles.fieldValue}>{user.email}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldKey}>Ngày tạo:</Text>
                        <Text style={styles.fieldValue}>{dateFormat(user.created_at)}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldKey}>Vai trò:</Text>
                        <Text style={styles.fieldValue}>{user.role}</Text>
                    </View>
                </View>

                <Text style={styles.title}>Chi tiêu</Text>
                
                <View style={styles.block}>
                    <View style={styles.field}>
                        <Text style={styles.fieldKey}>Phí đã trả:</Text>
                        <Text style={styles.fieldValue}>{formatMoneyVN(user.orders.reduce((sum, order) => {
                            if(order.status != 'Cancelled')
                                return sum + parseFloat(order.total_amount)
                            else return sum + 0
                        }, 0.0))}đ</Text>
                    </View>


                    <Text style={styles.title}>Đơn hàng gần đây</Text>
                    <DataTable style={{backgroundColor: 'white', borderRadius: 20}}>
                        <DataTable.Header>
                        <DataTable.Title>Id đơn</DataTable.Title>
                        <DataTable.Title>Ngày</DataTable.Title>
                        <DataTable.Title>Giá</DataTable.Title>
                        <DataTable.Title>Trạng thái</DataTable.Title>
                        </DataTable.Header>

                        {user.orders.map((order) => (
                            <DataTable.Row key={order.id}>
                                <DataTable.Cell >#{order.id}</DataTable.Cell>
                                <DataTable.Cell >{dateFormat(order.created_at)}</DataTable.Cell>
                                <DataTable.Cell >{formatMoneyVN(order.total_amount)}đ</DataTable.Cell>
                                <DataTable.Cell>{order.status}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>


                    <Text style={styles.title}>Đánh giá</Text>
                    <DataTable style={{backgroundColor: 'white', borderRadius: 20}}>
                        <DataTable.Header>
                        <DataTable.Title>prodId</DataTable.Title>
                        <DataTable.Title>Rate</DataTable.Title>
                        <DataTable.Title>Comment</DataTable.Title>
                        <DataTable.Title>Action</DataTable.Title>
                        </DataTable.Header>

                        {user.ratings.map((rating) => (
                            <DataTable.Row key={rating.id}>
                                <DataTable.Cell >#{rating.id}</DataTable.Cell>
                                <DataTable.Cell >{rating.star}*</DataTable.Cell>
                                <DataTable.Cell >{rating.comment}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Text style={{
                                        color: 'red'
                                    }}>Xóa</Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            </View>

            <View style={styles.block}>
                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Full Name</Text>
                    <TextInput mode='outlined' onChangeText={text => {
                        setUser(prev => {
                            return {...prev, full_name: text}
                        })
                    }} placeholder='Full Name' value={user.full_name} />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Phone Number</Text>
                    <TextInput onChangeText={text => {
                        setUser(prev => {
                            return {...prev, phone_number: text}
                        })
                    }} mode='outlined' placeholder='Phone Number' value={user.phone_number} />
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Role</Text>
                    <View style={{
                        borderWidth: 1
                    }}>
                        <Picker onValueChange={role => {
                            setUser(prev => {
                                return {...prev, role}
                            })
                        }} placeholder="Role" style={styles.dropdown} >
                            <Picker.Item label="admin" value={'admin'}   />
                            <Picker.Item label="user" value={'user'}  />
                        </Picker>
                    </View>
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.formLabel}>Password</Text>
                    <TextInput onChangeText={text => {
                        setUser(prev => {
                            return {...prev, password: text}
                        })
                    }} secureTextEntry mode='outlined' value={user.password} />
                </View>

                <View style={styles.formItem}>
                   <Button onPress={onSave} mode='contained'>Save Change</Button>
                </View>
            </View>
        </DefaultLayout>
    )
}

const styles = StyleSheet.create({
    formItem: {
        gap: 10
    },
    formLabel: {
        fontWeight: 'bold',
        fontSize: 20
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fieldKey: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    fieldValue: {
        fontSize: 16,
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20

    },
    block: {
        gap: 15,
        marginVertical: 10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        padding: 8,
        borderRadius: 8
    }
})
