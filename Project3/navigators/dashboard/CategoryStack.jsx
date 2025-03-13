import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Categories from "../../screens/dashboard/Categories";
import CreateCategory from "../../screens/dashboard/CreateCategory";
import EditCategory from "../../screens/dashboard/EditCategory";

const Stack = createNativeStackNavigator();
export default function CategoryStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="CreateCategory" component={CreateCategory} />
        <Stack.Screen name="EditCategory" component={EditCategory} />

      </Stack.Navigator>
    );
  }