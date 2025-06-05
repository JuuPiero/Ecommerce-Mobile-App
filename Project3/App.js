import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerTab from './navigators/CustomerTab';
import DashboardTab from './navigators/DashboardTab';
import AuthProvider from './contexts/AuthContext';
import Login from './screens/Login';
import { PaperProvider, Button } from "react-native-paper";
import theme from './theme';
import Signup from './screens/Signup';
import { ErrorBoundary } from './components/ErrorBoundary';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
        <NavigationContainer >
          <AuthProvider>
             <ErrorBoundary>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} options={{
                  gestureEnabled: false,
                  headerLeft: () => null,
                }} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Admin" component={DashboardTab} />
                <Stack.Screen name="Customer" component={CustomerTab} />
              </Stack.Navigator>
            </ErrorBoundary>
          </AuthProvider>
        </NavigationContainer>
    </PaperProvider>
  );
}