import { useNavigation } from '@react-navigation/native';
import { Image, View } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
export default function Dashboard({ navigation }) {
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' }}>
     
      <Card>
        <Card.Title title="Test card" />
        <Card.Content>
          <Text>Test asjdk </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => alert('Click me!')}>
            Click me!
          </Button>
          <Button onPress={() => navigation.navigate('Login')}>go to login</Button>

        </Card.Actions>
      </Card>
    </View>
  );
}