import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

export default function NewAtributeInput({ id, setNewAttribute }) {
    const [attribute, setAttribute] = useState({
        name: "",
        value: ""
    });

    const handleChange = (key, value) => {
        const updatedAttribute = { ...attribute, [key]: value };
        setAttribute(updatedAttribute);
        setNewAttribute(id, updatedAttribute);  // Gửi ID và data lên cha
    };

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between'
        }}>
            <TextInput
                style={styles.attributeInput}
                placeholder="Attribute Name"
                mode="outlined"
                value={attribute.name}
                onChangeText={text => handleChange("name", text)}
            />
            <TextInput
                style={styles.attributeInput}
                placeholder="Value"
                mode="outlined"
                value={attribute.value}
                onChangeText={text => handleChange("value", text)}
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
        width: '48%'
    }
    
})