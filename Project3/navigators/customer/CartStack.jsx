import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../../screens/customer/Cart";
import Checkout from "../../screens/customer/Checkout";


const Stack = createNativeStackNavigator();
export default function CartStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CartScreen" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
    );
}