import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerTab from './navigators/CustomerTab';
import DashboardTab from './navigators/DashboardTab';
import AuthProvider from './contexts/AuthContext';
import Login from './screens/Login';

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <AuthProvider>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Login" component={Login} /> */}
          <Stack.Screen name="Customer" component={CustomerTab} />
          <Stack.Screen name="Admin" component={DashboardTab} />
          <Stack.Screen name="Login" component={Login} />

        </Stack.Navigator>
      </NavigationContainer>
    // </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
