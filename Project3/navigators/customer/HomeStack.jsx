import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/customer/Home";
import ProudctDetail from "../../screens/customer/ProudctDetail";

const Stack = createNativeStackNavigator();
export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="ProductDetail" component={ProudctDetail} />
            {/* <Stack.Screen name="CategoryDetail" component={{}} /> */}
            {/* <Stack.Screen name="CreateProduct" component={CreateProduct} /> */}
        </Stack.Navigator>
    );
}