import { Dimensions, FlatList, ImageBackground, StyleSheet, View } from "react-native";
import DefaultLayout from "../../layouts/dashboard/DefaultLayout";
const { width } = Dimensions.get('window');
export default function ProudctDetail() {
    return (
        <DefaultLayout>
            <View style={{
                // margin: 30,
                marginVertical: 30,
                // backgroundColor: 'purple',
            }}>
                <FlatList
                    data={data}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={<ImageBackground 
                                source={{ urri: "https://www.countrysideamishfurniture.com/media/made/uploads/newark-side-chair_-_28de80_-_0bf4bdb70864a2154eec6001390467db2752640e.jpg" }} 
                               style={[styles.card]}>
                            </ImageBackground>
                    }
                />
            </View>

            <View>

            </View>
       
        </DefaultLayout>
    )
}
const styles = StyleSheet.create({
    card: {
        width: width * 0.8,
        height: 200,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden'
    },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
})