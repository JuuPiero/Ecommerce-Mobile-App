import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import CategoryItem from './CategoryItem'
import api from '../../api/api'

export default function CategorySlider({categories = []}) {

    return (
        <View style={{
            marginVertical: 30,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            padding: 8,
            borderRadius: 8
        }}>
            <FlatList
                data={categories}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CategoryItem category={item} />}
            />
        </View>
    )
}
