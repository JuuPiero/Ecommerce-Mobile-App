import { useNavigation } from '@react-navigation/native';
import { Alert, Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
const { width } = Dimensions.get('window');
export default function CategoryItem({category = null}) {
    const navigation = useNavigation()   
    
    return (
        <ImageBackground 
            source={{ uri: category?.image ? category.image : "https://www.countrysideamishfurniture.com/media/made/uploads/newark-side-chair_-_28de80_-_0bf4bdb70864a2154eec6001390467db2752640e.jpg" }} 
            style={[styles.card]}
            onTouchEnd={e=> {
                navigation.navigate('CategoryDetail', {category : category})
            }} >
                <Text style={styles.title}>{category?.name ?? "test"}</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.8,
        height: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden',
        // boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        
    },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
})