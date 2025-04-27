import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../../screens/dashboard/Products";
import CreateProduct from "../../screens/dashboard/CreateProduct";
import EditProduct from "../../screens/dashboard/EditProduct";
import Users from "../../screens/dashboard/Users";
import UserDetail from "../../screens/dashboard/UserDetail";

const Stack = createNativeStackNavigator();
export default function UserStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="UserDetail" component={UserDetail} />

      </Stack.Navigator>
    );
  }