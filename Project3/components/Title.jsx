import { StyleSheet, Text } from "react-native"

export default function Title({text}) {
    return (
        <Text>{text}</Text>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20
    }
})