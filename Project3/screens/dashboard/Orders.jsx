import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CategoryCard from "../../components/dashboard/CategoryCard";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/api";
import Loading from "../../components/Loading";
import { decodeEntities } from "../../utils/utils";
import { Picker } from "@react-native-picker/picker"
import OrderCard from "../../components/dashboard/OrderCard";
import Pagination from "../../components/Pagination";

export default function Orders({onReset}) {
    const navigation = useNavigation();

    const [orders, setOrders] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])

    const [status, setStatus] = useState([])
    const [statusFilter, setStatusFilter] = useState(null)
    

    async function getOrdes() {
        try {
            const response = await axios.get(API_URL + "/api/v1/orders?page=" + currentPage)
            setOrders(response.data.orders.data)
            setStatus(Object.values(response.data.orderStatus))
            setPages(response.data.orders.links)
            setRefreshing(false);
            
        } catch (error) {
            Alert.alert(error.message)
        }
    }
    const onRefresh = async () => {
        setRefreshing(true);
        getOrdes()
    };
    useEffect(() => {
        onRefresh()
    }, [currentPage])


    if(refreshing) return <Loading />

    const filteredOrders = statusFilter
    ? orders.filter(order => order.status == statusFilter)
    : orders;

    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing}>
            <View style={{ 
                padding: 10, display: 'flex', 
                justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text role='heading' style={{fontSize: 30}} >Đơn hàng</Text>
                <Picker onValueChange={status => {
                    setStatusFilter(status)
                }} placeholder="Trạng thái" style={styles.dropdown}>
                    <Picker.Item label="Trạng thái" value={null} />
                    {
                        status.map((status, index) => <Picker.Item key={index} label={status} value={status} />)
                    }
                </Picker>
            </View>

            {filteredOrders.map(order => 
                <OrderCard status={status} order={order} key={order.id} />)}
           
            <Pagination links={pages} onPageChange={setCurrentPage}  />
            
        </DefaultLayout>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        width: '50%'
    },
})