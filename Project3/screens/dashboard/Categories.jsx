import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import CategoryCard from "../../components/CategoryCard";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";

export default function Categories() {
    return (
        <DefaultLayout>
            <View>
                <View style={{ padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text role='heading' style={{fontSize: 30}} >Categories</Text>
                    <Button mode='contained'>New Category</Button>        
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
