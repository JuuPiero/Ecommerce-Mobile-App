import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { API_URL } from '../../api/api';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
    categoryCard: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        paddingVertical: 10, 
        backgroundColor: 'white', 
        marginBottom: 10, 
        borderRadius: 15,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    }
})

function CategoryCard({category}) {
    const navigation = useNavigation()
    
    return (
        <View style={styles.categoryCard}>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: category.image?.includes('https') ? category.image : (API_URL + "/storage/" + category.image)}}
                resizeMode={'cover'}
                />
            <View>
                <Text style={{ 
                    fontWeight: 'bold',
                    fontSize: 20
                    
                }}>{category.name}</Text>
                <Text >{category.description?.substring(0, 10)}...</Text>
            </View>
            <Button onPress={() => {  navigation.navigate('Category', { 
                screen: 'EditCategory',
                params: {
                    id: category.id 
                }
            }) }}>Edit</Button>
        </View>
    )
}

export default CategoryCard;