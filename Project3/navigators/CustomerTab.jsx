import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'; 
import Home from "../screens/customer/Home";
import HomeStack from "./customer/HomeStack";
import CartStack from "./customer/CartStack";
import ProfileStack from "./customer/ProfileStack";
import PurchaseStack from "./customer/PurchaseStack";
import Cart from "../screens/customer/Cart";
import Search from "../screens/customer/Search";

const Tab = createBottomTabNavigator();

export default function CustomerTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Cart') iconName = 'cart';
          else if (route.name === 'Orders') iconName = 'receipt';
          else if (route.name === 'Profile') iconName = 'person-circle-outline';
          else if (route.name === 'Purchase') iconName = 'cube-outline';
          else if (route.name === 'Search') iconName = 'search-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
    
      <Tab.Screen  name="Home" component={HomeStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Purchase" component={PurchaseStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}