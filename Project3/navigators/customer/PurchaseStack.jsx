import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/customer/Home";
import Purchase from "../../screens/customer/Purchase";


const Stack = createNativeStackNavigator();
export default function PurchaseStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Purchase" component={Purchase} />
    
            {/* <Stack.Screen name="CreateProduct" component={CreateProduct} /> */}
        </Stack.Navigator>
    );
}