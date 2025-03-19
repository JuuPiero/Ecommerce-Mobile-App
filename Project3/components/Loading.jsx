import { Text, View } from 'react-native'

export default function Loading() {
    return (
        <Text style={{
            color: 'red',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform : 'translateX(-50%)',
            fontSize: 25,
            fontWeight: 'bold'
        }}>Loading ...</Text>
    )
}
