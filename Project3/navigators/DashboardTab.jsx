import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'; 
import Dashboard from "../screens/dashboard/Dashboard";
import Products from "../screens/dashboard/Products";
import Orders from "../screens/dashboard/Orders";
import Categories from "../screens/dashboard/Categories";
import Users from "../screens/dashboard/Users";
import CategoryStack from "./dashboard/CategoryStack";
import ProductStack from "./dashboard/ProductStack";

const Tab = createBottomTabNavigator();

export default function DashboardTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'stats-chart';
          else if (route.name === 'Category') iconName = 'grid';
          else if (route.name === 'Product') iconName = 'pricetag';
          else if (route.name === 'Orders') iconName = 'cart';
          else if (route.name === 'Users') iconName = 'person'
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Category" component={CategoryStack} />
      <Tab.Screen name="Product" component={ProductStack} />


      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Users" component={Users} />

    </Tab.Navigator>
  );
}
