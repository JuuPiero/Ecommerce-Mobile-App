import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Button, Text, Title } from 'react-native-paper';
import { AuthContext } from '../../contexts/AuthContext';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';
import Loading from '../../components/Loading';
import { Ionicons } from '@expo/vector-icons'; 
import DashboardItem from '../../components/dashboard/DashboardItem';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get("window").width;
const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99]
    }
  ]
};
export default function Dashboard() {
  const navigation = useNavigation()
  const {user} = useContext(AuthContext)
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
  
  }
  useEffect(() => {
      onRefresh()
  }, [])


  
  if(refreshing || !user) return <Loading />
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
          width: '100%'
        }}>
          <Button style={{
            width: 100,
          }} mode='contained' onPress={e => {
            navigation.navigate('Customer')
          }}><Ionicons size={20} name={'home-outline'} /></Button>
        </View>

        <DashboardItem icon={'people-outline'} title={'Account'} quantity={855}/>
        <DashboardItem icon={'cube-outline'} title={'Orders'} quantity={855}/>
        <DashboardItem icon={'logo-dropbox'} title={'Product'} quantity={2}/>
        <DashboardItem icon={'chatbox-ellipses-outline'} title={'Rating'} quantity={10}/>


        <LineChart
          data={data}
          width={screenWidth - 20} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            // backgroundGradientFrom: '#fb8c00',
            // backgroundGradientTo: '#ffdd00',
            decimalPlaces: 2, // optional, defaults to 2
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    </DefaultLayout>
  );
}
