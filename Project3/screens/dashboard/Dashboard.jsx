import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Button, Text, Title } from 'react-native-paper';
import { AuthContext } from '../../contexts/AuthContext';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';
import Loading from '../../components/Loading';
import { Ionicons } from '@expo/vector-icons'; 
import DashboardItem from '../../components/dashboard/DashboardItem';
export default function Dashboard() {
  const navigation = useNavigation()
  const {user} = useContext(AuthContext)
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
  
  }
  useEffect(() => {
      onRefresh()
  }, [])

  const data = [
      {quarter: 1, earnings: 13000},
      {quarter: 2, earnings: 16500},
      {quarter: 3, earnings: 14250},
      {quarter: 4, earnings: 19000},
  ];

  
  if(refreshing || !user) return <Loading />
  return (
    <DefaultLayout  onRefresh={onRefresh} refreshing={refreshing}>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
        rowGap: 15
      }}>
        <DashboardItem icon={'people-outline'} title={'Account'} quantity={855}/>
        <DashboardItem icon={'cube-outline'} title={'Orders'} quantity={855}/>
        <DashboardItem icon={'logo-dropbox'} title={'Product'} quantity={2}/>
        <DashboardItem icon={'logo-dropbox'} title={'Product'} quantity={2}/>

        <Card>
          <Card.Title  title="Test card" />
          <Card.Content>
            <Text>Test asjdk </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => navigation.navigate('Customer')}>
              Go Home
            </Button>
            <Button onPress={() => navigation.navigate('Login')}>go to login</Button>
          </Card.Actions>
        </Card>
      </View>
    </DefaultLayout>
  );
}
