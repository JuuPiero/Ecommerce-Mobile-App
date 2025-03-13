import React from 'react'
import { View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

export default function NewAtributeInput() {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10
        }}>
            <TextInput
                style={styles.attributeInput}
                placeholder="Attribute Name"
                mode="outlined"
            />
            <TextInput
                style={styles.attributeInput}
                placeholder="Value"
                mode="outlined"
            />
        </View>
    )
}
const styles = StyleSheet.create({
    attributeContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    attributeInput: {
        // display: 'flex',
        width: '50%'
    }
    
})