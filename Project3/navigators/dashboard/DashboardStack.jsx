import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Categories from "../../screens/dashboard/Categories";
import CreateCategory from "../../screens/dashboard/CreateCategory";
import EditCategory from "../../screens/dashboard/EditCategory";
import Dashboard from "../../screens/dashboard/Dashboard";
import Search from "../../screens/dashboard/Search";

const Stack = createNativeStackNavigator();
export default function DashboardStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DashboardScreen" component={Dashboard} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    );
  }