import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import CategoryItem from './CategoryItem'
const data = [
    { id: '1', name: 'Danh mục test', color: '#FF5733', image: 'https://www.hacom.vn/media/lib/chutchigame.jpg' },
    { id: '2', name: 'Gear', color: '#33C1FF', image: 'https://tiki.vn/blog/wp-content/uploads/2023/03/tai-nghe-bluetooth.jpg' },
    { id: '3', name: 'Laptop', color: '#8D33FF', image: 'https://file.hstatic.net/200000722513/file/gearvn-ban-phim-co-gia-re_86a245a2897147088bb9e5fe71aa29e2_1024x1024.png' },
]

export default function CategorySlider() {
    
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
                renderItem={({ item }) => <CategoryItem category={item} />}
            />
        </View>
    )
}
