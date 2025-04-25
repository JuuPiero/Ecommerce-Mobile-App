import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Categories from "../../screens/dashboard/Categories";
import CreateCategory from "../../screens/dashboard/CreateCategory";
import EditCategory from "../../screens/dashboard/EditCategory";
import Orders from "../../screens/dashboard/Orders";
import OrderDetail from "../../screens/dashboard/OrderDetail";

const Stack = createNativeStackNavigator();
export default function OrderStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
      </Stack.Navigator>
    );
  }