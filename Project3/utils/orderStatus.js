import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    orderContainer: {
        justifyContent: 'space-evenly', 
        padding: 10, 
        backgroundColor: 'white', 
        marginBottom: 10, 
        borderRadius: 10
    },
    statusBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginVertical: 4
    },
    pending: {
        backgroundColor: '#fff4da',
        color: 'orange',
    },
    processing: {
        backgroundColor: '#d0e7ff',
        color: '#007bff',

    },
    shipped: {
        backgroundColor: '#d9f6ff',
        color: '#17a2b8',

    },
    completed: {
        backgroundColor: '#d6f5d6',
        color: 'green',

    },
    cancelled: {
        backgroundColor: '#ffe0e0',
        color: 'red',
    },

})

const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return [styles.statusBox, styles.pending];
      case 'processing':
        return [styles.statusBox, styles.processing];
      case 'shipped':
        return [styles.statusBox, styles.shipped];
      case 'completed':
        return [styles.statusBox, styles.completed];
      case 'cancelled':
        return [styles.statusBox, styles.cancelled];
      default:
        return [styles.statusBox];
    }
}

export {
    getStatusStyle
}