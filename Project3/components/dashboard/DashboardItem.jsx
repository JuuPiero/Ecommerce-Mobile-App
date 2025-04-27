import { StyleSheet, Text, View } from "react-native"
import { Title } from "react-native-paper"
import { Ionicons } from '@expo/vector-icons'; 
export default function DashboardItem({title, icon, quantity}) {
    return (
        <View style={styles.card}>
            <Title style={{
                width: '100%',
                fontWeight: 'bold'
            }}>{title}</Title>
            <Ionicons color={'blue'} style={styles.cardIcon} size={30} name={icon} /> 
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold'
            }}>{quantity}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 10
  }

})