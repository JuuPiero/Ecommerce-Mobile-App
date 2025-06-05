import { useNavigation } from '@react-navigation/native';
import { Alert, Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { imageUrl } from '../../utils/utils';
const { width } = Dimensions.get('window');
export default function CategoryItem({category}) {
    const navigation = useNavigation()   
    
    return (
        <ImageBackground 
            source={{ uri: imageUrl(category.image) }} 
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
    },
    title: { 
        color: '#fff', 
        fontSize: 32,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
})