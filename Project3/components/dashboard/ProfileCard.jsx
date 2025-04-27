import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { API_URL } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

function ProfileCard({user}) {
    const navigation = useNavigation()

    return (
        <Pressable onPress={e => {
            navigation.navigate('UserDetail', {user})
        }} style={styles.profileCard}>
            <Text style={styles.role}>Role: {user.role}</Text>
            <Text>{user.id}</Text>
            {
                user.role == 'user' ? <Ionicons style={styles.profileIcon} size={30} name="person" /> :
                <Ionicons style={styles.profileIcon} size={30} name='logo-ionitron' />
            }
            <View style={{flex: 1, gap: 5}}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20
                }}>{user.full_name}</Text>
                <View style={{flexDirection: 'row', gap: 15}}>
                    <Text>{user.email}</Text>
                    <Text>* 10 orders</Text>
                </View>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    profileCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 15,
        gap: 10,
    },
    profileIcon: {
        padding: 15,
        borderWidth: 5,
        borderRadius: 100,
        gap: 15,
        borderColor: '#0865fe'
    },
    role: {
        position: 'absolute',
        right: 0,
        top: 0,
        paddingVertical: 8,
        paddingHorizontal: 10,
        // backgroundColor: 'red'
    }


})
export default ProfileCard;