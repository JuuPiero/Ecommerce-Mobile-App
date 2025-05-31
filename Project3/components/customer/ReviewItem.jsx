import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

export default function ReviewItem({review}) {
    return (
      <View style={{
            borderBottomWidth: 1,
            borderColor: '#ccc',
            paddingVertical: 10,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            borderRadius: 8,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20

        }}>
            <View>
                <Ionicons name='person-circle-outline' size={50} />
            </View>
            <View>
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
        </View>
    )
}
