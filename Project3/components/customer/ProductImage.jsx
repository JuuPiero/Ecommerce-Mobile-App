import { Dimensions, Image, StyleSheet } from "react-native"
const { width } = Dimensions.get('window');

export default function ProductImage({image}) {
    return (
        <Image
            style={styles.image}
            source={{uri: image.name.includes('https') ? image.name : API_URL + '/strorage/' + image.name }}
            resizeMode={'cover'} 
        />
    )
}


const styles = StyleSheet.create({
    image: {
        width: width * 0.8,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden',
        
    },
})