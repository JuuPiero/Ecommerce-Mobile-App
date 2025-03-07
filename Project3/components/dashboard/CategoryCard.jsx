import React from 'react';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { API_URL } from '../../api/api';

function CategoryCard({category}) {
    console.log(category.image);
    
    return (
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, backgroundColor: 'white', marginBottom: 10, borderRadius: 15}}>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: category.image?.includes('https') ? category.image : (API_URL + "/storage/" + category.image)}}
                resizeMode={'cover'} // cover or contain its upto you view look
                />
            <View>
                <Text style={{ 
                    fontWeight: 'bold',
                    fontSize: 20
                    
                }}>{category.name}</Text>
                <Text >{category.description?.substring(0, 10)}...</Text>
            </View>
            <Button onPress={() => { alert('edit') }}>Edit</Button>
        </View>
    )
}

export default CategoryCard;