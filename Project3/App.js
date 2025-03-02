import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerTab from './navigators/CustomerTab';
import DashboardTab from './navigators/DashboardTab';

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer >
        {/* <SearchHeader />
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            headerShown: false, 
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'Users') iconName = 'person';
              else if (route.name === 'Products') iconName = 'pricetags';
              else if (route.name === 'Category') iconName = 'apps';
              else if (route.name === 'Orders') iconName = 'cart';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'purple',
            // tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Users" component={Products} />
          <Tab.Screen name="Category" component={Categories} />
          <Tab.Screen name="Products" component={Products} />
          <Tab.Screen name="Orders" component={Orders} />

        </Tab.Navigator> */}

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Login" component={Login} /> */}
          <Stack.Screen name="Customer" component={CustomerTab} />
          <Stack.Screen name="Admin" component={DashboardTab} />
        </Stack.Navigator>
      </NavigationContainer>
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
