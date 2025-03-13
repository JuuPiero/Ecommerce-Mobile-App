import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/customer/Home";


const Stack = createNativeStackNavigator();
export default function PurchaseStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
    
            {/* <Stack.Screen name="CreateProduct" component={CreateProduct} /> */}
        </Stack.Navigator>
    );
}