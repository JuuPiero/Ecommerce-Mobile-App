import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/customer/Home";
import ProductDetail from "../../screens/customer/ProductDetail";
import CategoryDetail from "../../screens/customer/CategoryDetail";


const Stack = createNativeStackNavigator();
export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
        </Stack.Navigator>
    );
}