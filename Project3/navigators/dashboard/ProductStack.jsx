import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../../screens/dashboard/Products";
import CreateProduct from "../../screens/dashboard/CreateProduct";
import EditProduct from "../../screens/dashboard/EditProduct";

const Stack = createNativeStackNavigator();
export default function ProductStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="CreateProduct" component={CreateProduct} />
        <Stack.Screen name="EditProduct" component={EditProduct} />

      </Stack.Navigator>
    );
  }