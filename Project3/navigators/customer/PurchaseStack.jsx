import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/customer/Home";
import Purchase from "../../screens/customer/Purchase";
import OrderDetail from "../../screens/customer/OrderDetail";


const Stack = createNativeStackNavigator();
export default function PurchaseStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Purchase" component={Purchase} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
        </Stack.Navigator>
    );
}