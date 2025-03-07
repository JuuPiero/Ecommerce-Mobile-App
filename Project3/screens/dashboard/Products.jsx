import { Image, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Table from '../../components/dashboard/Table';
import ProductCard from '../../components/dashboard/ProductCard';
import DefaultLayout from '../../layouts/dashboard/DefaultLayout';


export default function Products() {
    return (
      <DefaultLayout>
        <ScrollView >
          <View style={{ padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text role='heading' style={{fontSize: 30}} >Products</Text>
            <Button mode='contained' onPress={e => {
              alert("new")
            }}>New Products</Button>        
          </View>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <View style={{ padding: 20, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            <Button mode='contained'> B </Button> 
            <Button mode='text'>1</Button>
            <Button mode='text' textColor='gray'>2</Button>
            <Button mode='text' textColor='gray'>10</Button> 
            <Button mode='contained'>Next</Button>        
          </View>
          <Table />
        </ScrollView>
      </DefaultLayout>
    )     
}
