import { useNavigation } from "@react-navigation/native";
import { View } from "react-native"
import { Button, Text } from "react-native-paper"

export default function Home() {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Home</Text>
            <Button mode="contained" onPress={() => {
                navigation.replace("Admin");
            }}>Test chuyển sang admin</Button>
        </View>
    )
}