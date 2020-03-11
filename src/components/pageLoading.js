import React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default function PageLoading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color='#A0A0A0' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})
