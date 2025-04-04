import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import CategoryItem from './CategoryItem'
const data = [
    { id: '1', name: 'Danh mục test', color: '#FF5733', image: 'https://woodentwist.com/cdn/shop/products/91pjix_sL5L._SL1500.jpg' },
    { id: '2', name: 'Card 2', color: '#33C1FF', image: 'https://woodenbazar.com/cdn/shop/files/new-handicrafts-wooden-hand-carved-royal-look-chair-518.webp?v=1729347126' },
    { id: '3', name: 'Card 3', color: '#8D33FF', image: null },
]

export default function CategorySlider() {
    const [categories, setCategories] = useState([])
    
    return (
        <View style={{
            marginVertical: 30,
        }}>
            <FlatList
                data={data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={CategoryItem}
            />
        </View>
    )
}
