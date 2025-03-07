import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../../screens/dashboard/Products";
import CreateProduct from "../../screens/dashboard/CreateProduct";

const Stack = createNativeStackNavigator();
export default function ProductStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="CreateProduct" component={CreateProduct} />
      </Stack.Navigator>
    );
  }