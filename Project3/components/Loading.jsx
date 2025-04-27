import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function Loading({ size = 'large', color = '#0000ff' }) {
    return (
        <View style={styles.container}>
          <ActivityIndicator size={size} color={color} />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });