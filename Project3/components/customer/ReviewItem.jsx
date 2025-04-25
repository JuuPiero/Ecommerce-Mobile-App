import { Text, View } from "react-native";

export default function ReviewItem({review}) {
    return (
      <View style={{
            borderBottomWidth: 1,
            borderColor: '#ccc',
            paddingVertical: 10
        }}>
            <View style={{
                flexDirection: 'row',
                gap: 10,
            }}>
                <Text style={{
                    fontWeight: 'bold'
                }}>Name</Text>
                <Text>🌟</Text>
            </View>
            <Text>
                Đây là đánh giá test
            </Text>
        </View>
    )
}
