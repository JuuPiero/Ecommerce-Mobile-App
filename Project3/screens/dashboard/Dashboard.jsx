import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Linking, View } from 'react-native';
import {Button} from 'react-native-paper';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';
import Loading from '../../components/Loading';
import { Ionicons } from '@expo/vector-icons'; 
import DashboardItem from '../../components/dashboard/DashboardItem';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import api from '../../api/api';
const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null)
 
  const getData = async () => {
     try {
        setRefreshing(true)
        const response = await api.get('api/v1/revenue')
        setData(response.data)
      } catch (error) {
        Alert.alert(error.message)
      }
  }

  const onRefresh = async () => {
    await getData();
    setRefreshing(false)
  }
  useEffect(() => {
      onRefresh()
  }, [])


  
  if(refreshing || !data) return <Loading />
  return (
    <DefaultLayout  onRefresh={onRefresh} refreshing={refreshing}>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        rowGap: 15
      }}>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Button style={{
            width: 100,
          }} mode='contained' onPress={e => {
            navigation.replace('Customer', {
              screen: 'Home'
            })
          }}><Ionicons size={20} name={'home-outline'} /></Button>

          <Button style={{
            
          }} mode='contained' onPress={ ()=>{ Linking.openURL(data.revanue)}}>Export Revanue</Button>
        </View>

        <DashboardItem icon={'people-outline'} title={'Account'} quantity={data?.quantity.user}/>
        <DashboardItem icon={'cube-outline'} title={'Orders'} quantity={data?.quantity.order}/>
        <DashboardItem icon={'logo-dropbox'} title={'Product'} quantity={data?.quantity.product}/>
        <DashboardItem icon={'chatbox-ellipses-outline'} title={'Rating'} quantity={data?.quantity.rate}/>


        {/* <LineChart
          data={data}
          width={screenWidth - 20} 
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            decimalPlaces: 2, // optional, defaults to 2
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />  */}
      </View>
    </DefaultLayout>
  );
}
