import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../../screens/dashboard/Products";

const Stack = createNativeStackNavigator();
export default function ProductStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="CreateProduct" component={{}} />
      </Stack.Navigator>
    );
  }