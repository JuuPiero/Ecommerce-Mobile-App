import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import CategoryCard from "../../components/dashboard/CategoryCard";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
    const navigation = useNavigation();
    return (
        <DefaultLayout>
            <View>
                <View style={{ padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text role='heading' style={{fontSize: 30}} >Categories</Text>
                    <Button mode='contained' onPress={e => {
                        navigation.navigate('CreateCategory')
                    }}>New Category</Button>        
                </View>

                {/* FOREACH HERE */}
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />

            </View>
        </DefaultLayout>
    )
}
