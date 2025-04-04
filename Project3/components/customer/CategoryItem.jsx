import React from 'react'
import { Alert, Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
const { width } = Dimensions.get('window');
export default function CategoryItem({item}) {
    
    return (
     
        <ImageBackground 
            source={{ uri: item.image ?? "https://www.countrysideamishfurniture.com/media/made/uploads/newark-side-chair_-_28de80_-_0bf4bdb70864a2154eec6001390467db2752640e.jpg" }} 
            onTouchEnd={e=> {
            Alert.alert("go to cateogry")
        }}  style={[styles.card]}>
                <Text style={styles.title}>{item.name}</Text>
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
        overflow: 'hidden'
    },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
})